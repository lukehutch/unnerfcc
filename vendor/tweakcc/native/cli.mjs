#!/usr/bin/env node
/**
 * Thin CLI over the vendored tweakcc-fixed native-binary I/O module.
 *
 *   node cli.mjs unpack <binaryPath> <outJsPath>
 *     Extract the Claude Code JS bundle from a native (Bun standalone) binary.
 *     Writes the JS to <outJsPath>; prints `clearBytecode=<bool>` and the
 *     version string discovered inside the JS. Exit non-zero on failure.
 *
 *   node cli.mjs repack <binaryPath> <inJsPath> <outBinPath>
 *     Read the (possibly modified) JS from <inJsPath>, recompute clearBytecode
 *     from its header, and rebuild the native binary into <outBinPath>.
 *
 * Exit codes:
 *   0  success
 *   1  generic failure (bad args, I/O error, non-format extraction error)
 *   3  BUN_FORMAT_INCOMPATIBLE — the binary's Bun container layout no longer
 *      matches what this vendored module understands. When this fires, re-vendor
 *      the native module from tweakcc-fixed (see UPSTREAM.md).
 */

import fs from 'node:fs';
import {
  extractClaudeJsFromNativeInstallation,
  repackNativeInstallation,
} from './nativeInstallation.ts';

const BYTECODE_SOURCE_MARKER = '// @bun @bytecode';

// Substrings in an error message that indicate the Bun standalone container
// format has drifted from what the vendored parser expects, rather than a
// mundane I/O or usage error.
const BUN_FORMAT_SIGNALS = [
  'trailer',
  'too small',
  'BUN',
  'module struct',
  'section',
  'overlay',
  'bunOffsets',
  'locateBundle',
  'parse',
  'magic',
];

function isBunFormatError(message) {
  if (!message) return false;
  const lower = String(message).toLowerCase();
  return BUN_FORMAT_SIGNALS.some(sig => lower.includes(sig.toLowerCase()));
}

function findVersion(js) {
  // Claude Code embeds its version in a few shapes across builds; try the most
  // specific first and fall back to a bare semver near a VERSION token.
  const patterns = [
    /\bVERSION\s*[:=]\s*["'](\d+\.\d+\.\d+[^"']*)["']/,
    /["']version["']\s*:\s*["'](\d+\.\d+\.\d+[^"']*)["']/,
    /@anthropic-ai\/claude-code["'\s,}]+[^]{0,200}?["'](\d+\.\d+\.\d+)["']/,
  ];
  for (const re of patterns) {
    const m = js.match(re);
    if (m) return m[1];
  }
  return null;
}

function fail(code, msg) {
  process.stderr.write(msg + '\n');
  process.exit(code);
}

function unpack(binaryPath, outJsPath) {
  if (!fs.existsSync(binaryPath)) {
    fail(1, `unpack: binary not found: ${binaryPath}`);
  }

  let result;
  try {
    result = extractClaudeJsFromNativeInstallation(binaryPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (isBunFormatError(message)) {
      fail(3, `BUN_FORMAT_INCOMPATIBLE: ${message}`);
    }
    fail(1, `unpack: extraction threw: ${message}`);
  }

  if (!result || result.data == null) {
    const message = (result && result.error) || 'unknown extraction failure';
    if (isBunFormatError(message)) {
      fail(3, `BUN_FORMAT_INCOMPATIBLE: ${message}`);
    }
    fail(1, `unpack: ${message}`);
  }

  fs.writeFileSync(outJsPath, result.data);

  const js = result.data.toString('utf8');
  const version = findVersion(js);

  process.stdout.write(`clearBytecode=${result.clearBytecode}\n`);
  process.stdout.write(`version=${version ?? '<not found>'}\n`);
  process.stdout.write(`bytes=${result.data.length}\n`);
  process.stdout.write(`wrote=${outJsPath}\n`);
}

function repack(binaryPath, inJsPath, outBinPath) {
  if (!fs.existsSync(binaryPath)) {
    fail(1, `repack: binary not found: ${binaryPath}`);
  }
  if (!fs.existsSync(inJsPath)) {
    fail(1, `repack: input JS not found: ${inJsPath}`);
  }

  const js = fs.readFileSync(inJsPath);
  // Bytecode must be cleared unless the module still carries the Bun bytecode
  // source marker in its header; a modified source without the marker cannot
  // keep stale bytecode.
  const clearBytecode = !js
    .subarray(0, BYTECODE_SOURCE_MARKER.length)
    .toString('utf8')
    .startsWith(BYTECODE_SOURCE_MARKER);

  try {
    repackNativeInstallation(binaryPath, js, outBinPath, clearBytecode);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (isBunFormatError(message)) {
      fail(3, `BUN_FORMAT_INCOMPATIBLE: ${message}`);
    }
    fail(1, `repack: repack threw: ${message}`);
  }

  process.stdout.write(`clearBytecode=${clearBytecode}\n`);
  process.stdout.write(`wrote=${outBinPath}\n`);
}

function main() {
  const [, , cmd, ...rest] = process.argv;

  if (cmd === 'unpack') {
    if (rest.length < 2) {
      fail(1, 'usage: node cli.mjs unpack <binaryPath> <outJsPath>');
    }
    unpack(rest[0], rest[1]);
  } else if (cmd === 'repack') {
    if (rest.length < 3) {
      fail(1, 'usage: node cli.mjs repack <binaryPath> <inJsPath> <outBinPath>');
    }
    repack(rest[0], rest[1], rest[2]);
  } else {
    fail(
      1,
      'usage:\n' +
        '  node cli.mjs unpack <binaryPath> <outJsPath>\n' +
        '  node cli.mjs repack <binaryPath> <inJsPath> <outBinPath>'
    );
  }
}

main();
