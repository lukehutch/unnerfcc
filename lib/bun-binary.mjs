#!/usr/bin/env node
/**
 * bun-binary.mjs — extract and re-package the JS bundle embedded in a
 *                  Claude Code Bun single-file native binary.
 *
 * This is unnerfcc's OWN implementation (no tweakcc code). It handles exactly
 * the format Claude Code currently ships on Linux/x64: an ELF with a `.bun`
 * section holding Bun's standalone "module graph" blob, whose `cli.js` module
 * is stored as readable `@bun-cjs` source. Format reference (verified against a
 * real binary):
 *
 *   ELF `.bun` section  = [u64 size header][blob]        (u32 header on Bun<1.3.4)
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
 * Extract is pure-buffer (no deps). Repack rebuilds the blob and re-injects the
 * `.bun` section via node-lief (a general ELF library — not tweakcc): the
 * section grows, so it is moved to a fresh page-aligned vaddr past the writable
 * segment, the segment is extended, and the single 8-byte pointer the Bun
 * runtime dereferences to find the blob (which holds the OLD .bun vaddr, aligned
 * in the writable PT_LOAD segment) is patched to the new vaddr.
 *
 * If the binary is not this format, extract()/repack() throw an Error whose
 * message begins "BUN_FORMAT:" — the CLI turns that into BUN_FORMAT_INCOMPATIBLE.
 *
 * CLI:  node bun-binary.mjs unpack <binary> <out.js>
 *       node bun-binary.mjs repack <binary> <in.js> <out-binary>
 */

import { readFileSync, writeFileSync, statSync, chmodSync, renameSync, unlinkSync, existsSync } from "node:fs";

const TRAILER = Buffer.from("\n---- Bun! ----\n");
const SIZEOF_OFFSETS = 32;
const SIZEOF_SP = 8;
const MODULE_NEW = 6 * SIZEOF_SP + 4; // 52
const MODULE_OLD = 4 * SIZEOF_SP + 4; // 36
const BLOB_HEADER_ALIGNMENT = 16384;
const BYTECODE_PREFIX = "// @bun @bytecode";

function fmtErr(msg) {
  return new Error("BUN_FORMAT: " + msg);
}

// --- minimal ELF section-header parse (find .bun offset/size/vaddr) ---------
function findBunSection(buf) {
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
  for (let i = 0; i < e_shnum; i++) {
    const b = shOff(i);
    const name = buf.readUInt32LE(b);
    const off = Number(buf.readBigUInt64LE(b + 0x18));
    const size = Number(buf.readBigUInt64LE(b + 0x20));
    const addr = Number(buf.readBigUInt64LE(b + 0x10));
    if (nameAt(name) === ".bun") return { off, size, vaddr: addr };
  }
  return null;
}

// --- StringPointer helpers --------------------------------------------------
const readSP = (blob, at) => ({ offset: blob.readUInt32LE(at), length: blob.readUInt32LE(at + 4) });
const spContent = (blob, sp) => blob.subarray(sp.offset, sp.offset + sp.length);

function detectModuleStruct(modulesListLen) {
  const fitsNew = modulesListLen % MODULE_NEW === 0;
  const fitsOld = modulesListLen % MODULE_OLD === 0;
  if (fitsNew && !fitsOld) return MODULE_NEW;
  if (fitsOld && !fitsNew) return MODULE_OLD;
  return MODULE_NEW; // ambiguous → assume new (both 36|52 divide → new is current)
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
  const sec = findBunSection(buf);
  if (!sec) throw fmtErr(".bun section not found (only the ELF .bun-section format is supported)");
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
    meta: { blob, offsets, structSize, modules, headerSize, section: sec, fileSize: buf.length },
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
 * Uses node-lief only for the ELF section/segment surgery + pointer patch.
 */
export async function repack(binaryPath, newJs, outPath) {
  const { meta } = extract(binaryPath);
  const newBlob = rebuildBlob(meta, newJs);
  const newSection = buildSectionData(newBlob, meta.headerSize);

  const LIEF = (await import("node-lief")).default;
  LIEF.logging?.disable?.();
  const bin = LIEF.parse(binaryPath);
  if (!bin) throw fmtErr("node-lief could not parse the binary");
  const bunSection = bin.getSection(".bun");
  if (!bunSection) throw fmtErr(".bun section not found by node-lief");
  const rwSeg = bin.segments().find((s) => s.type === "LOAD" && (s.flags & 2) !== 0);
  if (!rwSeg) throw fmtErr("no writable PT_LOAD segment");

  // Find the 8-byte pointer to the OLD .bun vaddr, aligned in the RW segment.
  const oldVaddr = BigInt(bunSection.virtualAddress);
  const want = Buffer.alloc(8); want.writeBigUInt64LE(oldVaddr);
  const rw = Buffer.from(rwSeg.content);
  const rwStart = BigInt(rwSeg.virtualAddress);
  const align = BigInt(BLOB_HEADER_ALIGNMENT);
  let ptrVaddr = null;
  for (let va = alignBig(rwStart, align); va <= rwStart + BigInt(rw.length) - 8n; va += align) {
    const o = Number(va - rwStart);
    if (rw.subarray(o, o + 8).equals(want)) { ptrVaddr = va; break; }
  }
  if (ptrVaddr === null) throw fmtErr(`could not find the Bun blob pointer (old vaddr 0x${oldVaddr.toString(16)})`);

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
