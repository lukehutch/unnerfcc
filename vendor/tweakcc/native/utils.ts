/**
 * Minimal logging shim for the vendored native-binary I/O module.
 *
 * The real tweakcc-fixed `utils.ts` exposes a large surface; this vendored copy
 * only needs the two symbols that `nativeInstallation.ts` imports: `isDebug`
 * and `debug`. Signatures match the originals so the verbatim copy of
 * `nativeInstallation.ts` compiles and links unchanged.
 *
 * Enable debug logging with either `TWEAKCC_DEBUG` or `DEBUG` in the env.
 */

export const isDebug = (): boolean => {
  return process.env.TWEAKCC_DEBUG || process.env.DEBUG ? true : false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debug = (message: any, ...optionalParams: any[]): void => {
  if (isDebug()) {
    console.error(message, ...optionalParams);
  }
};
