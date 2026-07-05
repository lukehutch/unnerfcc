/**
 * Utility shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/utils.ts` is ~18 KB and imports the TUI/model
 * surface (`./patches/modelSelector`, child_process, etc.). The prompt-patcher
 * graph only needs the four helpers below. `escapeNonAscii` and `stringifyRegex`
 * are copied verbatim from the upstream source so behavior is identical;
 * `debug`/`verbose` are gated on env flags.
 *
 * Enable debug logging with TWEAKCC_DEBUG or DEBUG; verbose with TWEAKCC_VERBOSE.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const isDebug = (): boolean =>
  process.env.TWEAKCC_DEBUG || process.env.DEBUG ? true : false;

const isVerbose = (): boolean =>
  process.env.TWEAKCC_VERBOSE ? true : false;

export const debug = (message: any, ...optionalParams: any[]): void => {
  if (isDebug()) console.error(message, ...optionalParams);
};

export const verbose = (message: any, ...optionalParams: any[]): void => {
  if (isVerbose()) console.error(message, ...optionalParams);
};

// Verbatim from tweakcc-fixed src/utils.ts.
export const escapeNonAscii = (s: string): string =>
  s.replace(
    /[\u0080-\uffff]/g,
    c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
  );

// Verbatim from tweakcc-fixed src/utils.ts.
export const stringifyRegex = (regex: RegExp): string => {
  const str = regex.toString();
  const lastSlash = str.lastIndexOf('/');
  const pattern = JSON.stringify(str.substring(1, lastSlash));
  const flags = JSON.stringify(str.substring(lastSlash + 1));
  return `new RegExp(${pattern}, ${flags})`;
};
