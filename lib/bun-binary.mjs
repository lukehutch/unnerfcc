#!/usr/bin/env node
/**
 * bun-binary.mjs — extract and re-package the JS bundle embedded in a
 *                  Claude Code Bun single-file native binary.
 *
 * This is unnerfcc's OWN implementation (no tweakcc code). It handles the two
 * formats Claude Code ships: an ELF with a `.bun` section (Linux/x64) and a
 * Mach-O with a `__BUN,__bun` segment/section (macOS), both holding Bun's
 * standalone "module graph" blob, whose `cli.js` module is stored as readable
 * `@bun-cjs` source. The blob format is byte-identical across both containers
 * (verified against real binaries) — only the container-level surgery differs:
 *
 *   ELF `.bun` section / Mach-O `__BUN,__bun` section = [u64 size header][blob]
 *                                                        (u32 header on Bun<1.3.4)
 *   blob                = [ data … ][OFFSETS 32B][TRAILER 15B]
 *   TRAILER             = "\n---- Bun! ----\n"
 *   OFFSETS (32B)       = u64 byteCount
 *                         {u32 off,u32 len} modulesPtr
 *                         u32 entryPointId
 *                         {u32 off,u32 len} compileExecArgvPtr
 *                         u32 flags
 *   module (52B new fmt)= 6 × {u32 off,u32 len} StringPointer
 *                         (name, contents, sourcemap, bytecode, moduleInfo,
 *                          bytecodeOriginPath) + 4 × u8 (encoding, loader,
 *                          moduleFormat, side)                   [36B old fmt = 4 SP + 4 u8]
 *   StringPointer off/len are relative to the blob.
 *
 * Extract is pure-buffer (no deps) for both formats. Repack rebuilds the blob
 * and re-injects it via node-lief (a general ELF/Mach-O library — not tweakcc):
 *
 *   ELF: the section grows, so it is moved to a fresh page-aligned vaddr past
 *   the writable segment, the segment is extended, and the single 8-byte
 *   pointer the Bun runtime dereferences to find the blob (which holds the OLD
 *   .bun vaddr, aligned in the writable PT_LOAD segment) is patched to the new
 *   vaddr.
 *
 *   Mach-O: the `__BUN` segment is the second-to-last segment (before
 *   `__LINKEDIT`), so LIEF's `extendSegment()` grows it in place — the
 *   section's vmaddr/fileoff never move, only `__LINKEDIT` shifts later in the
 *   file (LIEF fixes up every load command that points into it). Confirmed
 *   empirically that the segment's own vmaddr appears NOWHERE else in the
 *   binary (unlike ELF) — the Bun macOS runtime must locate the blob by
 *   segment/section name via dyld (`getsectiondata`), not a hardcoded pointer,
 *   so no address patch is needed. Any binary modification invalidates the
 *   Mach-O code signature, which macOS (especially Apple Silicon) enforces at
 *   launch, so the old signature is stripped and the output is ad-hoc
 *   re-signed (`codesign --sign -`) before the caller's boot-check runs.
 *
 * If the binary is neither format (or an unrecognized internal layout),
 * extract()/repack() throw an Error whose message begins "BUN_FORMAT:" — the
 * CLI turns that into BUN_FORMAT_INCOMPATIBLE.
 *
 * CLI:  node bun-binary.mjs unpack <binary> <out.js>
 *       node bun-binary.mjs repack <binary> <in.js> <out-binary>
 */

import { readFileSync, writeFileSync, statSync, chmodSync, renameSync, unlinkSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const TRAILER = Buffer.from("\n---- Bun! ----\n");
const SIZEOF_OFFSETS = 32;
const SIZEOF_SP = 8;
const MODULE_NEW = 6 * SIZEOF_SP + 4; // 52
const MODULE_OLD = 4 * SIZEOF_SP + 4; // 36
const BLOB_HEADER_ALIGNMENT = 16384;
const BYTECODE_PREFIX = "// @bun @bytecode";
const MH_MAGIC_64 = 0xfeedfacf;
const LC_SEGMENT_64 = 0x19;

function fmtErr(msg) {
  return new Error("BUN_FORMAT: " + msg);
}

// --- format detection --------------------------------------------------------
function detectFormat(buf) {
  if (buf.length >= 4 && buf.readUInt32BE(0) === 0x7f454c46) return "elf";
  if (buf.length >= 4 && buf.readUInt32LE(0) === MH_MAGIC_64) return "macho";
  throw fmtErr("unrecognized binary format (neither ELF nor 64-bit Mach-O)");
}

// --- minimal Mach-O load-command parse (find __BUN,__bun offset/size/vaddr) -
function findBunSectionMachO(buf) {
  if (buf.length < 32) throw fmtErr("Mach-O file too small for a header");
  const ncmds = buf.readUInt32LE(16);
  const sizeofcmds = buf.readUInt32LE(20);
  const cmdsEnd = 32 + sizeofcmds;
  if (cmdsEnd > buf.length) throw fmtErr("Mach-O load commands run past end of file");
  let off = 32;
  for (let i = 0; i < ncmds; i++) {
    if (off + 8 > cmdsEnd) throw fmtErr("Mach-O load command table truncated");
    const cmd = buf.readUInt32LE(off);
    const cmdsize = buf.readUInt32LE(off + 4);
    if (cmdsize < 8 || off + cmdsize > cmdsEnd) throw fmtErr(`Mach-O load command ${i} has an invalid size`);
    if (cmd === LC_SEGMENT_64 && cmdsize >= 72) {
      const segname = buf.toString("latin1", off + 8, off + 24).replace(/\0.*$/, "");
      if (segname === "__BUN") {
        const nsects = buf.readUInt32LE(off + 64);
        if (nsects < 1) throw fmtErr("__BUN segment has no sections");
        const secOff = off + 72; // first section_64 immediately follows segment_command_64
        if (secOff + 80 > off + cmdsize) throw fmtErr("__BUN segment command too small for its section");
        const sectname = buf.toString("latin1", secOff, secOff + 16).replace(/\0.*$/, "");
        if (sectname !== "__bun") throw fmtErr(`__BUN segment's first section is "${sectname}", not "__bun"`);
        const addr = Number(buf.readBigUInt64LE(secOff + 32));
        const size = Number(buf.readBigUInt64LE(secOff + 40));
        const fileOff = buf.readUInt32LE(secOff + 48);
        return { off: fileOff, size, vaddr: addr };
      }
    }
    off += cmdsize;
  }
  return null;
}

// --- minimal ELF section-header parse (find .bun offset/size/vaddr) ---------
function findBunSectionELF(buf) {
  if (buf.length < 64 || buf.readUInt32BE(0) !== 0x7f454c46) throw fmtErr("not an ELF binary");
  if (buf[4] !== 2) throw fmtErr("not a 64-bit ELF");
  const e_shoff = Number(buf.readBigUInt64LE(0x28));
  const e_shentsize = buf.readUInt16LE(0x3a);
  const e_shnum = buf.readUInt16LE(0x3c);
  const e_shstrndx = buf.readUInt16LE(0x3e);
  if (!e_shoff || !e_shnum) throw fmtErr("ELF has no section headers");
  const shOff = (i) => e_shoff + i * e_shentsize;
  const strTabOff = Number(buf.readBigUInt64LE(shOff(e_shstrndx) + 0x18));
  const nameAt = (nameOff) => {
    let end = buf.indexOf(0, strTabOff + nameOff);
    return buf.toString("utf8", strTabOff + nameOff, end);
  };
  let bun = null, maxSectionEnd = 0;
  const SHT_NOBITS = 8;
  for (let i = 0; i < e_shnum; i++) {
    const b = shOff(i);
    const name = buf.readUInt32LE(b);
    const type = buf.readUInt32LE(b + 4);
    const off = Number(buf.readBigUInt64LE(b + 0x18));
    const size = Number(buf.readBigUInt64LE(b + 0x20));
    const addr = Number(buf.readBigUInt64LE(b + 0x10));
    if (type !== SHT_NOBITS) maxSectionEnd = Math.max(maxSectionEnd, off + size); // NOBITS occupies no file bytes
    if (nameAt(name) === ".bun") bun = { off, size, vaddr: addr };
  }
  if (!bun) return null;
  // Track the end of file bytes that belong to a known structure (sections +
  // the section-header table), so extract() can detect ELF overlay (appended
  // bytes past all of it) that a naive LIEF re-write might not preserve.
  const shTableEnd = e_shoff + e_shnum * e_shentsize;
  bun.knownEnd = Math.max(maxSectionEnd, shTableEnd);
  return bun;
}

// --- StringPointer helpers --------------------------------------------------
const readSP = (blob, at) => ({ offset: blob.readUInt32LE(at), length: blob.readUInt32LE(at + 4) });
// Bounds-checked content read: a StringPointer that runs past the blob (or is
// negative) means the blob isn't the format we parsed — fail loud, never clamp
// (a silent clamp would rebuild a corrupt blob).
function spContent(blob, sp, what = "string pointer") {
  if (sp.offset < 0 || sp.length < 0 || sp.offset + sp.length > blob.length) {
    throw fmtErr(`${what} out of bounds (offset=${sp.offset} length=${sp.length} blob=${blob.length})`);
  }
  return blob.subarray(sp.offset, sp.offset + sp.length);
}

function detectModuleStruct(modulesListLen) {
  const fitsNew = modulesListLen % MODULE_NEW === 0;
  const fitsOld = modulesListLen % MODULE_OLD === 0;
  if (fitsNew && !fitsOld) return MODULE_NEW;
  if (fitsOld && !fitsNew) return MODULE_OLD;
  // Ambiguous (divisible by both) or neither → we can't reliably pick the module
  // struct size; the layout isn't one we recognize. Fail loud rather than guess.
  throw fmtErr(
    `cannot determine module struct size: modulesPtr.length=${modulesListLen} ` +
    `is ${fitsNew ? "divisible by both 52 and 36 (ambiguous)" : "divisible by neither 52 nor 36"}`
  );
}

const isClaudeModule = (name) =>
  name.endsWith("/claude") || name === "claude" || name.endsWith("/claude.exe") ||
  name.endsWith("src/entrypoints/cli.js");

function parseOffsets(blob) {
  const start = blob.length - SIZEOF_OFFSETS - TRAILER.length;
  if (start < 0) throw fmtErr("blob too small for offsets + trailer");
  if (!blob.subarray(blob.length - TRAILER.length).equals(TRAILER)) throw fmtErr("Bun trailer not found at blob end");
  let p = start;
  const byteCount = blob.readBigUInt64LE(p); p += 8;
  const modulesPtr = readSP(blob, p); p += 8;
  const entryPointId = blob.readUInt32LE(p); p += 4;
  const compileExecArgvPtr = readSP(blob, p); p += 8;
  const flags = blob.readUInt32LE(p);
  // Bounds/sanity — a blob that passed the header+trailer checks but whose
  // internal pointers are out of range is an unrecognized layout; fail loud.
  if (byteCount > BigInt(blob.length)) throw fmtErr(`byteCount ${byteCount} exceeds blob length ${blob.length}`);
  if (modulesPtr.offset + modulesPtr.length > blob.length || modulesPtr.length === 0)
    throw fmtErr(`modules list pointer out of bounds (offset=${modulesPtr.offset} length=${modulesPtr.length} blob=${blob.length})`);
  if (compileExecArgvPtr.offset + compileExecArgvPtr.length > blob.length)
    throw fmtErr(`compileExecArgv pointer out of bounds`);
  return { byteCount, modulesPtr, entryPointId, compileExecArgvPtr, flags };
}

function parseModules(blob, offsets, structSize) {
  const list = spContent(blob, offsets.modulesPtr);
  const n = Math.floor(list.length / structSize);
  const mods = [];
  for (let i = 0; i < n; i++) {
    const b = i * structSize;
    const sp = (k) => readSP(list, b + k * SIZEOF_SP);
    const nSP = structSize === MODULE_NEW ? 6 : 4;
    const ptrs = { name: sp(0), contents: sp(1), sourcemap: sp(2), bytecode: sp(3) };
    if (nSP === 6) { ptrs.moduleInfo = sp(4); ptrs.bytecodeOriginPath = sp(5); }
    const enumBase = b + nSP * SIZEOF_SP;
    mods.push({
      ptrs,
      name: spContent(blob, ptrs.name).toString("utf8"),
      encoding: list[enumBase], loader: list[enumBase + 1],
      moduleFormat: list[enumBase + 2], side: list[enumBase + 3],
    });
  }
  return mods;
}

/**
 * Extract the cli.js bundle. Returns { js, meta } where meta carries everything
 * repack() needs (blob, offsets, module table, section geometry, header size).
 */
export function extract(binaryPath) {
  const buf = readFileSync(binaryPath);
  const format = detectFormat(buf);
  const sec = format === "elf" ? findBunSectionELF(buf) : findBunSectionMachO(buf);
  if (!sec) {
    throw fmtErr(
      format === "elf"
        ? ".bun section not found (only the ELF .bun-section format is supported)"
        : "__BUN segment not found (only the Mach-O __BUN,__bun segment format is supported)"
    );
  }
  if (format === "elf") {
    // ELF overlay = file bytes appended past every section and the section-header
    // table. node-lief's re-write models sections/segments, not arbitrary overlay,
    // so if a build ever appends one, repack could silently drop or relocate it.
    // The boot-check after repack is the ultimate guard; warn here so it's visible.
    const overlay = buf.length - sec.knownEnd;
    if (overlay > 0) {
      process.stderr.write(
        `bun-binary: note — ${overlay} bytes of ELF overlay past the last section; ` +
        `repack relies on node-lief to preserve it (the post-repack boot-check verifies).\n`
      );
    }
  }
  const section = buf.subarray(sec.off, sec.off + sec.size);
  // size header: u64 (Bun ≥ 1.3.4) else u32
  let headerSize;
  if (section.length >= 8 && Number(section.readBigUInt64LE(0)) + 8 === section.length) headerSize = 8;
  else if (section.length >= 4 && section.readUInt32LE(0) + 4 === section.length) headerSize = 4;
  else throw fmtErr("unrecognized .bun section size header");
  const blob = section.subarray(headerSize);
  const offsets = parseOffsets(blob);
  const structSize = detectModuleStruct(offsets.modulesPtr.length);
  const modules = parseModules(blob, offsets, structSize);
  const claude = modules.find((m) => isClaudeModule(m.name));
  if (!claude) throw fmtErr("claude module not found in the module graph");
  const js = spContent(blob, claude.ptrs.contents);
  return {
    js: Buffer.from(js),
    meta: { format, blob, offsets, structSize, modules, headerSize, section: sec, fileSize: buf.length },
  };
}

// --- blob rebuild (replace the claude module's contents) --------------------
function rebuildBlob(meta, newJs) {
  const { blob, offsets, structSize, modules } = meta;
  const nSP = structSize === MODULE_NEW ? 6 : 4;
  const clearBytecode = !newJs.subarray(0, BYTECODE_PREFIX.length).toString("latin1").startsWith(BYTECODE_PREFIX);

  // Phase 1: collect each module's strings (replacing claude contents).
  const strings = []; // flat list, nSP per module, in field order
  const perModule = [];
  for (const m of modules) {
    const isClaude = isClaudeModule(m.name);
    const name = spContent(blob, m.ptrs.name);
    const contents = isClaude ? newJs : spContent(blob, m.ptrs.contents);
    const sourcemap = spContent(blob, m.ptrs.sourcemap);
    const bytecode = isClaude && clearBytecode ? Buffer.alloc(0) : spContent(blob, m.ptrs.bytecode);
    const fields = [name, contents, sourcemap, bytecode];
    if (nSP === 6) fields.push(spContent(blob, m.ptrs.moduleInfo), spContent(blob, m.ptrs.bytecodeOriginPath));
    perModule.push({ fields, enums: [m.encoding, m.loader, m.moduleFormat, m.side] });
    for (const f of fields) strings.push(f);
  }

  // Phase 2: layout (each string NUL-terminated).
  let off = 0;
  const strOff = strings.map((s) => { const o = off; off += s.length + 1; return { offset: o, length: s.length }; });
  const modulesListOffset = off;
  off += modules.length * structSize;
  const compileExecArgv = spContent(blob, offsets.compileExecArgvPtr);
  const ceaOffset = off; off += compileExecArgv.length + 1;
  const offsetsOffset = off; off += SIZEOF_OFFSETS;
  const trailerOffset = off; off += TRAILER.length;

  // Phase 3: write.
  const out = Buffer.alloc(off);
  let si = 0;
  for (const s of strings) { s.copy(out, strOff[si].offset); out[strOff[si].offset + s.length] = 0; si++; }
  // module structs
  let mi = 0;
  for (let m = 0; m < modules.length; m++) {
    const base = modulesListOffset + m * structSize;
    for (let k = 0; k < nSP; k++) {
      const so = strOff[mi++];
      out.writeUInt32LE(so.offset, base + k * SIZEOF_SP);
      out.writeUInt32LE(so.length, base + k * SIZEOF_SP + 4);
    }
    const eb = base + nSP * SIZEOF_SP;
    const [e0, e1, e2, e3] = perModule[m].enums;
    out[eb] = e0; out[eb + 1] = e1; out[eb + 2] = e2; out[eb + 3] = e3;
  }
  if (compileExecArgv.length) compileExecArgv.copy(out, ceaOffset);
  // offsets struct
  let p = offsetsOffset;
  out.writeBigUInt64LE(BigInt(offsetsOffset), p); p += 8;           // byteCount = offsets location
  out.writeUInt32LE(modulesListOffset, p); out.writeUInt32LE(modules.length * structSize, p + 4); p += 8;
  out.writeUInt32LE(offsets.entryPointId, p); p += 4;
  out.writeUInt32LE(ceaOffset, p); out.writeUInt32LE(compileExecArgv.length, p + 4); p += 8;
  out.writeUInt32LE(offsets.flags, p);
  TRAILER.copy(out, trailerOffset);
  return out;
}

function buildSectionData(blob, headerSize) {
  const s = Buffer.alloc(headerSize + blob.length);
  if (headerSize === 8) s.writeBigUInt64LE(BigInt(blob.length), 0);
  else s.writeUInt32LE(blob.length, 0);
  blob.copy(s, headerSize);
  return s;
}

const alignBig = (v, a) => (v % a === 0n ? v : v + (a - (v % a)));

/**
 * Repack: rebuild the blob with newJs and write a modified binary to outPath.
 * Uses node-lief for the ELF/Mach-O container surgery (dispatches on format).
 */
export async function repack(binaryPath, newJs, outPath) {
  const { meta } = extract(binaryPath);
  const newBlob = rebuildBlob(meta, newJs);
  const newSection = buildSectionData(newBlob, meta.headerSize);
  if (meta.format === "macho") return repackMachO(binaryPath, newSection, outPath);
  return repackELF(binaryPath, newSection, outPath);
}

// --- Mach-O repack: extend __BUN in place, no pointer patch, re-sign --------
async function repackMachO(binaryPath, newSection, outPath) {
  const LIEF = (await import("node-lief")).default;
  LIEF.logging?.disable?.();
  const bin = LIEF.parse(binaryPath);
  if (!bin || bin.format !== "MachO") throw fmtErr("node-lief could not parse the binary as Mach-O");
  const seg = bin.getSegment("__BUN");
  if (!seg) throw fmtErr("__BUN segment not found by node-lief");
  const sec = seg.getSection("__bun");
  if (!sec) throw fmtErr("__bun section not found by node-lief");

  const needed = BigInt(newSection.length);
  if (needed > seg.fileSize) {
    const align = BigInt(BLOB_HEADER_ALIGNMENT);
    const growth = alignBig(needed - seg.fileSize, align);
    if (!bin.extendSegment(seg, growth)) throw fmtErr("failed to extend the __BUN segment");
  }
  sec.content = newSection;
  sec.size = needed;

  if (bin.hasCodeSignature) bin.removeSignature();

  const tmp = outPath + ".tmp";
  bin.write(tmp);
  // Any modification invalidates the Mach-O code signature; macOS (especially
  // Apple Silicon) refuses to run an unsigned/invalid binary, so ad-hoc
  // re-sign before the caller's boot-check. codesign is a macOS system tool —
  // this path only runs for Mach-O binaries, i.e. only on macOS.
  try {
    execFileSync("codesign", ["--sign", "-", "--force", tmp], { stdio: "pipe" });
  } catch (e) {
    try { unlinkSync(tmp); } catch {}
    throw fmtErr(`codesign failed: ${e.stderr?.toString().trim() || e.message}`);
  }
  try { chmodSync(tmp, statSync(binaryPath).mode); } catch {}
  try { renameSync(tmp, outPath); }
  catch (e) { try { if (existsSync(tmp)) unlinkSync(tmp); } catch {} throw e; }
}

// --- ELF repack: relocate .bun to a fresh vaddr, extend, patch the pointer --
async function repackELF(binaryPath, newSection, outPath) {
  const LIEF = (await import("node-lief")).default;
  LIEF.logging?.disable?.();
  const bin = LIEF.parse(binaryPath);
  if (!bin) throw fmtErr("node-lief could not parse the binary");
  const bunSection = bin.getSection(".bun");
  if (!bunSection) throw fmtErr(".bun section not found by node-lief");
  const rwSegs = bin.segments().filter((s) => s.type === "LOAD" && (s.flags & 2) !== 0);
  if (!rwSegs.length) throw fmtErr("no writable PT_LOAD segment");
  const rwSeg = rwSegs[0]; // segment we extend to place the new .bun

  // Find the 8-byte pointer holding the OLD .bun vaddr. Bun stores it
  // BLOB_HEADER_ALIGNMENT-aligned somewhere in a writable segment; the runtime
  // dereferences it to find the blob. Scan ALL writable segments and require
  // EXACTLY ONE match — zero means the layout changed, more than one means we
  // can't tell which to patch, and silently picking one could brick the binary.
  const oldVaddr = BigInt(bunSection.virtualAddress);
  const want = Buffer.alloc(8); want.writeBigUInt64LE(oldVaddr);
  const align = BigInt(BLOB_HEADER_ALIGNMENT);
  const hits = [];
  for (const seg of rwSegs) {
    const rw = Buffer.from(seg.content);
    const segStart = BigInt(seg.virtualAddress);
    for (let va = alignBig(segStart, align); va <= segStart + BigInt(rw.length) - 8n; va += align) {
      const o = Number(va - segStart);
      if (rw.subarray(o, o + 8).equals(want)) hits.push(va);
    }
  }
  if (hits.length === 0) throw fmtErr(`could not find the Bun blob pointer (old vaddr 0x${oldVaddr.toString(16)})`);
  if (hits.length > 1) throw fmtErr(`found ${hits.length} candidate blob pointers for vaddr 0x${oldVaddr.toString(16)} — ambiguous, refusing to patch`);
  const ptrVaddr = hits[0];

  const pageSize = BigInt(bin.pageSize());
  const alignedNewSize = alignBig(BigInt(newSection.length), pageSize);
  const newVaddr = alignBig(BigInt(bin.nextVirtualAddress()), pageSize);
  const offsetInSeg = newVaddr - BigInt(rwSeg.virtualAddress);
  const newFileOffset = BigInt(rwSeg.fileOffset) + offsetInSeg;
  const oldRwEnd = BigInt(rwSeg.fileOffset) + BigInt(rwSeg.fileSize);
  const extension = newFileOffset + alignedNewSize - oldRwEnd;
  if (extension < 0n) throw fmtErr("new .bun location overlaps the writable segment");
  if (extension > 0n) {
    if (!bin.extend(rwSeg, extension)) throw fmtErr("failed to extend the writable segment");
  }
  // node-lief's 64-bit ELF fields are bigints — passing Number truncates/mis-sets
  // and the runtime then can't find the moved blob (boots as bare Bun).
  bunSection.fileOffset = newFileOffset;
  bunSection.virtualAddress = newVaddr;
  bunSection.content = newSection;
  bunSection.size = BigInt(newSection.length);
  const patch = Buffer.alloc(8); patch.writeBigUInt64LE(newVaddr);
  bin.patchAddress(ptrVaddr, patch);

  const tmp = outPath + ".tmp";
  bin.write(tmp);
  try { chmodSync(tmp, statSync(binaryPath).mode); } catch {}
  try { renameSync(tmp, outPath); }
  catch (e) { try { if (existsSync(tmp)) unlinkSync(tmp); } catch {} throw e; }
}

// --- CLI --------------------------------------------------------------------
function versionOf(js) {
  const m = js.toString("latin1", 0, 4000).match(/Version:\s*(\d+\.\d+\.\d+)/) || js.toString("latin1", 0, 200000).match(/\b\d+\.\d+\.\d+\b/);
  return m ? m[1] || m[0] : "unknown";
}

async function main(argv) {
  const [cmd, bin, a, b] = argv;
  try {
    if (cmd === "unpack" && bin && a) {
      const { js } = extract(bin);
      writeFileSync(a, js);
      const clearBytecode = !js.subarray(0, BYTECODE_PREFIX.length).toString("latin1").startsWith(BYTECODE_PREFIX);
      console.log(`clearBytecode=${clearBytecode}`);
      console.log(`version=${versionOf(js)}`);
      console.log(`bytes=${js.length}`);
      return 0;
    }
    if (cmd === "repack" && bin && a && b) {
      const js = readFileSync(a);
      await repack(bin, js, b);
      console.log(`repacked -> ${b}`);
      return 0;
    }
    console.error("usage:\n  node bun-binary.mjs unpack <binary> <out.js>\n  node bun-binary.mjs repack <binary> <in.js> <out-binary>");
    return 2;
  } catch (e) {
    if (e && /^BUN_FORMAT:/.test(e.message)) {
      console.error(`BUN_FORMAT_INCOMPATIBLE: ${e.message.replace(/^BUN_FORMAT:\s*/, "")}`);
      return 3;
    }
    console.error(`error: ${e?.stack || e}`);
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2)).then((c) => process.exit(c));
}
