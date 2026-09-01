#!/usr/bin/env node
/**
 * bun-binary.mjs — extract and re-package the JS bundle embedded in a
 *                  Claude Code Bun single-file native binary.
 *
 * This is unnerfcc's OWN implementation (no tweakcc code). It handles the two
 * formats Claude Code ships: an ELF with a `.bun` section (Linux/x64) and a
 * Mach-O with a `__BUN,__bun` segment/section (macOS), both holding Bun's
 * standalone "module graph" blob. The blob format is byte-identical across
 * both containers (verified against real binaries) — only the container-level
 * surgery differs:
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
 * MULTI-MODULE GRAPH (as of v2.1.251): earlier Claude Code builds shipped the
 * entire application as ONE entry module (~25MB of JS) — the whole toolkit
 * (this file included) grew up assuming "the bundle" meant that one module.
 * v2.1.251 split the build into a Bun code-splitting graph: the entry point
 * (found via `offsets.entryPointId`, unrelated to this change and still
 * correct) is now a ~20KB dispatcher whose only job is to `import()` roughly
 * 1800 separate chunk modules on demand. The actual application logic —
 * including every system prompt — lives scattered across THOSE modules, not
 * the entry point. Confirmed empirically: the same prompt string can appear
 * in more than one chunk simultaneously (Bun's splitter duplicates small
 * shared string constants across chunk boundaries), so there is no single
 * "main" chunk to special-case — every module must be scanned. A separate
 * ~60-module subset (`*.md.zst`, `*.txt.zst`) stores larger reference-doc
 * content as raw zstd frames instead of plain string literals — transparently
 * decompressed on read and re-compressed on write here (Node's built-in
 * `node:zlib` has native zstd support; no dependency needed), so every
 * consumer of this file still just sees plain UTF-8 text.
 *
 * Extract/repack are pure-buffer (no deps) for the low-level blob and format
 * detection; repack re-injects the rebuilt blob via node-lief (a general
 * ELF/Mach-O library — not tweakcc):
 *
 *   ELF: the section grows, so it is moved to a fresh page-aligned vaddr past
 *   the writable segment, the segment is extended, and the single 8-byte
 *   pointer the Bun runtime dereferences to find the blob (which holds the OLD
 *   .bun vaddr, u64-aligned somewhere in the writable PT_LOAD segment) is
 *   patched to the new vaddr.
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
 * parseBinary()/repackFromDir() throw an Error whose message begins
 * "BUN_FORMAT:" — the CLI turns that into BUN_FORMAT_INCOMPATIBLE.
 *
 * CLI:  node bun-binary.mjs unpack <binary> <out-dir>
 *       node bun-binary.mjs repack <binary> <in-dir> <out-binary>
 *       node bun-binary.mjs list <binary>
 *
 * unpack writes one file per module under <out-dir> (mirroring each module's
 * own name as a relative path, zstd modules transparently decompressed) plus
 * a manifest.json repack reads back. repack only needs a REPLACEMENT for
 * modules that actually changed — any module absent from <in-dir> keeps its
 * original content untouched, so callers that only patch ~100 of ~1800
 * modules need not write the other ~1700 back out.
 */

import { readFileSync, writeFileSync, statSync, chmodSync, renameSync, unlinkSync, existsSync, realpathSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { dirname, join, sep } from "node:path";
import { zstdDecompressSync, zstdCompressSync } from "node:zlib";

const TRAILER = Buffer.from("\n---- Bun! ----\n");
const SIZEOF_OFFSETS = 32;
const SIZEOF_SP = 8;
const MODULE_NEW = 6 * SIZEOF_SP + 4; // 52
const MODULE_OLD = 4 * SIZEOF_SP + 4; // 36
const BLOB_HEADER_ALIGNMENT = 16384;
const BYTECODE_PREFIX = "// @bun @bytecode";
const MH_MAGIC_64 = 0xfeedfacf;
const LC_SEGMENT_64 = 0x19;
const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
const MANIFEST_NAME = "manifest.json";

function isZstd(buf) {
  return buf.length >= 4 && buf.subarray(0, 4).equals(ZSTD_MAGIC);
}

// Module names are Bun's own import specifiers (e.g. "/$bunfs/root/cli",
// "/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js") —
// already unique and already path-shaped. Strip the leading slash to make a
// safe relative path; refuse anything that would escape outDir (defensive —
// these names come from Anthropic's own build, not adversarial input, but
// the check is free).
function moduleRelPath(name) {
  const rel = name.replace(/^\/+/, "");
  const parts = rel.split("/");
  if (parts.some((p) => p === "..")) throw fmtErr(`unsafe module name (contains ..): ${name}`);
  return parts.join(sep);
}

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

// Does the module table parse cleanly at this struct size? Divisibility alone
// is not enough to tell 52 from 36: 52 and 36 share a factor of 4, so any table
// whose length is a multiple of 468 (lcm) divides evenly by both — which is
// exactly what the Linux x64 v2.1.251 binary does (102492 = 219 × 468, i.e.
// 1971 modules at 52 bytes or a bogus 2847 at 36). So actually read the table:
// at the wrong struct size the fields land on the wrong bytes and most entries
// stop looking like modules. Every entry must have an in-bounds, non-empty,
// absolute-path name (Bun's import specifiers are always "/…"), in-bounds
// content/sourcemap/bytecode pointers, and small enum bytes.
function moduleTableIsValid(blob, modulesListSP, structSize) {
  const list = spContent(blob, modulesListSP, "modules list");
  const n = list.length / structSize;
  if (!Number.isInteger(n) || n === 0) return false;
  const nSP = structSize === MODULE_NEW ? 6 : 4;
  for (let i = 0; i < n; i++) {
    const b = i * structSize;
    for (let k = 0; k < nSP; k++) {
      const off = list.readUInt32LE(b + k * SIZEOF_SP);
      const len = list.readUInt32LE(b + k * SIZEOF_SP + 4);
      if (off + len > blob.length) return false;
      if (k === 0) {
        if (len === 0 || blob[off] !== 0x2f /* "/" */) return false;
        if (blob.indexOf(0, off) < off + len) return false; // NUL inside the name
      }
    }
    // encoding / loader / moduleFormat / side are small enums, never large bytes.
    for (let k = 0; k < 4; k++) if (list[b + nSP * SIZEOF_SP + k] > 0x1f) return false;
  }
  return true;
}

function detectModuleStruct(blob, offsets) {
  const candidates = [MODULE_NEW, MODULE_OLD].filter(
    (s) => offsets.modulesPtr.length % s === 0 && moduleTableIsValid(blob, offsets.modulesPtr, s)
  );
  if (candidates.length === 1) return candidates[0];
  // Neither layout parses (unknown format), or — never yet observed — both do,
  // in which case guessing could silently rebuild a corrupt blob. Fail loud.
  throw fmtErr(
    `cannot determine module struct size: modulesPtr.length=${offsets.modulesPtr.length} ` +
    (candidates.length === 0
      ? "parses as neither the 52-byte nor the 36-byte module struct"
      : "parses as both the 52-byte and 36-byte module struct (ambiguous)")
  );
}

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
 * Parse a Claude Code binary down to its Bun module graph. Returns the meta
 * object repackFromDir()/unpackToDir() both need (blob, offsets, module
 * table, section geometry, header size) — no module content is read yet
 * (that's lazy, via moduleContent() below, since most callers only need a
 * handful of the ~1800 modules' actual bytes).
 */
export function parseBinary(binaryPath) {
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
  const structSize = detectModuleStruct(blob, offsets);
  const modules = parseModules(blob, offsets, structSize);
  if (!modules[offsets.entryPointId]) {
    throw fmtErr(`entry-point module (id=${offsets.entryPointId}) not found among ${modules.length} module(s)`);
  }
  return { format, blob, offsets, structSize, modules, headerSize, section: sec, fileSize: buf.length };
}

// Raw (possibly zstd-compressed) content of module i, straight from the blob.
function rawModuleContent(meta, i) {
  return spContent(meta.blob, meta.modules[i].ptrs.contents);
}

// Transparently decompressed content of module i — every consumer above this
// layer sees plain bytes regardless of how Bun stored them on disk.
function moduleContent(meta, i) {
  const raw = rawModuleContent(meta, i);
  return isZstd(raw) ? zstdDecompressSync(raw) : Buffer.from(raw);
}

/**
 * Unpack every module to <outDir>, one file per module at a path mirroring
 * its own name, plus a manifest.json repackFromDir() reads back. zstd modules
 * are decompressed on the way out; the manifest records which ones were
 * compressed so repackFromDir() knows to re-compress on the way back in.
 * Returns a summary (module counts, byte totals, detected version) for the
 * CLI to report — callers needing module content should read the files this
 * writes, not hold onto anything from this return value.
 */
export function unpackToDir(binaryPath, outDir) {
  const meta = parseBinary(binaryPath);
  mkdirSync(outDir, { recursive: true });
  const manifest = { entryPointId: meta.offsets.entryPointId, modules: [] };
  let zstdCount = 0, totalBytes = 0;
  for (let i = 0; i < meta.modules.length; i++) {
    const m = meta.modules[i];
    const raw = rawModuleContent(meta, i);
    const compressed = isZstd(raw);
    const content = compressed ? zstdDecompressSync(raw) : raw;
    if (compressed) zstdCount++;
    totalBytes += content.length;
    const relPath = moduleRelPath(m.name);
    const outPath = join(outDir, relPath);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, content);
    manifest.modules.push({ index: i, name: m.name, relPath, wasZstd: compressed, size: content.length });
  }
  writeFileSync(join(outDir, MANIFEST_NAME), JSON.stringify(manifest, null, 1));
  const entryJs = moduleContent(meta, meta.offsets.entryPointId);
  return {
    moduleCount: meta.modules.length,
    zstdCount,
    totalBytes,
    version: versionOf(entryJs),
    format: meta.format,
  };
}

// --- blob rebuild (replace zero or more modules' contents) ------------------
// `replacements` is Map<moduleIndex, Buffer> of NEW plain-text content, already
// re-compressed by the caller for any module that was originally zstd (see
// repackFromDir) — every module absent from the map keeps its original bytes
// untouched, which is the common case (a typical un-nerf pass touches ~100 of
// ~1800 modules).
function rebuildBlobMulti(meta, replacements) {
  const { blob, offsets, structSize, modules } = meta;
  const nSP = structSize === MODULE_NEW ? 6 : 4;
  const CONTENTS_FIELD = 1, BYTECODE_FIELD = 3; // index within [name, contents, sourcemap, bytecode, moduleInfo, bytecodeOriginPath]

  // Every (module, field) StringPointer, walked in ORIGINAL BLOB ORDER (not
  // module/field order) so whatever sits BETWEEN tracked strings is preserved
  // verbatim. This blob is NOT simply "every module's fields packed tightly" —
  // confirmed empirically on a real v2.1.251 binary: a ~10MB span sits between
  // two specific modules' fields, addressed by NO module's StringPointer at
  // all (alignment padding, or a Bun-internal structure this format isn't
  // fully reverse-engineered enough to name). An earlier version of this
  // function repacked only the known fields, silently dropped that data, and
  // produced a blob that segfaulted Bun's runtime at load. Preserving every
  // original byte outside the fields being intentionally replaced is the only
  // safe approach for a format this deep into "still not fully understood."
  const entries = [];
  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    const ptrs = [m.ptrs.name, m.ptrs.contents, m.ptrs.sourcemap, m.ptrs.bytecode];
    if (nSP === 6) ptrs.push(m.ptrs.moduleInfo, m.ptrs.bytecodeOriginPath);
    ptrs.forEach((ptr, field) => entries.push({ module: i, field, ptr }));
  }
  entries.sort((a, b) => a.ptr.offset - b.ptr.offset);

  const newPtr = new Map(); // "module:field" -> {offset, length} in the rebuilt blob
  const chunks = [];
  let newOff = 0, origCursor = 0;
  const push = (buf) => { chunks.push(buf); newOff += buf.length; };

  for (const e of entries) {
    // Gap since the previous tracked string ended, in ORIGINAL coordinates —
    // copied through byte-for-byte regardless of content. This also supplies
    // the NUL terminator every string needs: since origCursor advances by the
    // ORIGINAL length (not the replacement's), the next gap always starts
    // with whatever byte Bun itself put right after this field — a NUL on
    // every real bundle checked so far.
    if (e.ptr.offset > origCursor) push(blob.subarray(origCursor, e.ptr.offset));
    const replacement = e.field === CONTENTS_FIELD ? replacements.get(e.module) : undefined;
    const content = replacement ?? spContent(blob, e.ptr);
    newPtr.set(`${e.module}:${e.field}`, { offset: newOff, length: content.length });
    push(content);
    origCursor = e.ptr.offset + e.ptr.length;
  }
  // Final gap before the modules struct table begins.
  if (offsets.modulesPtr.offset > origCursor) push(blob.subarray(origCursor, offsets.modulesPtr.offset));

  const modulesListOffset = newOff;
  const modulesList = Buffer.alloc(modules.length * structSize);
  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    for (let field = 0; field < nSP; field++) {
      const ptr = newPtr.get(`${i}:${field}`);
      const base = i * structSize + field * SIZEOF_SP;
      modulesList.writeUInt32LE(ptr.offset, base);
      modulesList.writeUInt32LE(ptr.length, base + 4);
    }
    const eb = i * structSize + nSP * SIZEOF_SP;
    modulesList[eb] = m.encoding; modulesList[eb + 1] = m.loader;
    modulesList[eb + 2] = m.moduleFormat; modulesList[eb + 3] = m.side;
    // A replaced module's compiled-bytecode cache no longer matches its new
    // source. The bytecode bytes themselves were preserved verbatim above
    // like every other untouched field (harmless — nothing reads past a
    // pointer's declared length), so zeroing just this struct entry's length
    // here has the same effect as clearing the content, without needing a
    // second pass or breaking the single gap-preserving walk above.
    const replacement = replacements.get(i);
    if (replacement && !replacement.subarray(0, BYTECODE_PREFIX.length).toString("latin1").startsWith(BYTECODE_PREFIX)) {
      modulesList.writeUInt32LE(0, i * structSize + BYTECODE_FIELD * SIZEOF_SP + 4);
    }
  }
  push(modulesList);

  // Same reasoning as the per-field gaps above: whatever sits between the end
  // of the ORIGINAL modules struct table and the start of compileExecArgv
  // (padding/alignment — confirmed non-empty on a real binary) is preserved
  // verbatim rather than assumed to be zero-width.
  const modulesListEnd = offsets.modulesPtr.offset + offsets.modulesPtr.length;
  if (offsets.compileExecArgvPtr.offset > modulesListEnd) {
    push(blob.subarray(modulesListEnd, offsets.compileExecArgvPtr.offset));
  }

  const compileExecArgv = spContent(blob, offsets.compileExecArgvPtr);
  const ceaOffset = newOff;
  push(compileExecArgv);

  // Same again: the original offsets struct sits at a position derived purely
  // from blob length (see parseOffsets), so nothing downstream actually
  // depends on preserving whatever originally followed compileExecArgv — but
  // preserve it anyway rather than assume it's exactly zero-width, matching
  // every other boundary in this function.
  const origCeaEnd = offsets.compileExecArgvPtr.offset + offsets.compileExecArgvPtr.length;
  const origOffsetsStart = blob.length - SIZEOF_OFFSETS - TRAILER.length;
  if (origOffsetsStart > origCeaEnd) push(blob.subarray(origCeaEnd, origOffsetsStart));

  const offsetsOffset = newOff;
  const offsetsBuf = Buffer.alloc(SIZEOF_OFFSETS);
  let p = 0;
  offsetsBuf.writeBigUInt64LE(BigInt(offsetsOffset), p); p += 8;   // byteCount = offsets location
  offsetsBuf.writeUInt32LE(modulesListOffset, p); offsetsBuf.writeUInt32LE(modules.length * structSize, p + 4); p += 8;
  offsetsBuf.writeUInt32LE(offsets.entryPointId, p); p += 4;
  offsetsBuf.writeUInt32LE(ceaOffset, p); offsetsBuf.writeUInt32LE(compileExecArgv.length, p + 4); p += 8;
  offsetsBuf.writeUInt32LE(offsets.flags, p);
  push(offsetsBuf);
  push(TRAILER);

  return Buffer.concat(chunks, newOff);
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
 * Repack: read <inDir>'s manifest, take a replacement for every module it has
 * a file for (re-compressing back to zstd for any module the manifest marks
 * wasZstd), leave every other module exactly as it was in the original
 * binary, and write the rebuilt binary to outPath. Uses node-lief for the
 * ELF/Mach-O container surgery (dispatches on format).
 */
export async function repackFromDir(binaryPath, inDir, outPath) {
  const meta = parseBinary(binaryPath);
  const manifestPath = join(inDir, MANIFEST_NAME);
  if (!existsSync(manifestPath)) throw fmtErr(`${MANIFEST_NAME} not found in ${inDir} — was this produced by 'unpack'?`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  const replacements = new Map();
  for (const entry of manifest.modules) {
    const filePath = join(inDir, entry.relPath);
    if (!existsSync(filePath)) continue; // untouched module — keep original bytes
    const newContent = readFileSync(filePath);
    replacements.set(entry.index, entry.wasZstd ? zstdCompressSync(newContent) : newContent);
  }

  const newBlob = rebuildBlobMulti(meta, replacements);
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

  // Find the 8-byte pointer holding the OLD .bun vaddr. Bun stores it somewhere
  // in a writable segment and the runtime dereferences it to find the blob. It
  // is a naturally-aligned u64, nothing stronger: through v2.1.251 it happened
  // to land on a 16384-byte boundary, but in v2.1.258 it sits at a vaddr that is
  // only 8-aligned, so scanning on the coarse boundary found nothing at all.
  //
  // Scanning every 8 bytes does mean the .bun section's own content gets
  // searched (the blob lives inside the writable segment), and ~122MB of
  // arbitrary JS/data hits the pattern by chance — v2.1.258 has exactly one
  // such coincidence. Those bytes are data we are about to replace wholesale,
  // never the pointer, so skip the section's own vaddr range.
  //
  // Require EXACTLY ONE match outside it: zero means the layout changed, more
  // than one means we can't tell which to patch, and silently picking one could
  // brick the binary.
  const oldVaddr = BigInt(bunSection.virtualAddress);
  const oldVaddrEnd = oldVaddr + BigInt(bunSection.size);
  const want = Buffer.alloc(8); want.writeBigUInt64LE(oldVaddr);
  const hits = [];
  for (const seg of rwSegs) {
    const rw = Buffer.from(seg.content);
    const segStart = BigInt(seg.virtualAddress);
    for (let va = alignBig(segStart, 8n); va <= segStart + BigInt(rw.length) - 8n; va += 8n) {
      if (va >= oldVaddr && va < oldVaddrEnd) { va = alignBig(oldVaddrEnd, 8n) - 8n; continue; }
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
      const summary = unpackToDir(bin, a);
      console.log(`format=${summary.format} modules=${summary.moduleCount} zstd=${summary.zstdCount}`);
      console.log(`version=${summary.version}`);
      console.log(`bytes=${summary.totalBytes}`);
      return 0;
    }
    if (cmd === "repack" && bin && a && b) {
      await repackFromDir(bin, a, b);
      console.log(`repacked -> ${b}`);
      return 0;
    }
    if (cmd === "list" && bin) {
      // Diagnostic: dump every module name in the graph. Useful whenever the
      // entry-point content or a specific module's whereabouts needs checking
      // by hand — the module list is under Anthropic's build config, not
      // Bun's container format, and has changed shape before (v2.1.231 renamed
      // the entry; v2.1.251 split one entry into ~1800 chunk modules).
      const meta = parseBinary(bin);
      console.log(`format=${meta.format} structSize=${meta.structSize} entryPointId=${meta.offsets.entryPointId} moduleCount=${meta.modules.length}`);
      meta.modules.forEach((m, i) => {
        const raw = rawModuleContent(meta, i);
        const zstd = isZstd(raw) ? ", zstd" : "";
        console.log(`[${i}]${i === meta.offsets.entryPointId ? " *entry*" : ""} ${m.name} (${m.encoding === 0 ? "text" : "binary"}, ${raw.length}B${zstd})`);
      });
      return 0;
    }
    console.error("usage:\n  node bun-binary.mjs unpack <binary> <out-dir>\n  node bun-binary.mjs repack <binary> <in-dir> <out-binary>\n  node bun-binary.mjs list <binary>");
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

// realpath process.argv[1] before comparing: import.meta.url is always symlink-
// resolved by Node's loader, but argv[1] isn't — invoking via a symlinked path
// (e.g. macOS's /tmp -> /private/tmp) would otherwise make this always false,
// silently skipping main() while still exiting 0.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main(process.argv.slice(2)).then((c) => process.exit(c));
}
