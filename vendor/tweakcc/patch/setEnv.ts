/**
 * Env bootstrap for the vendored prompt-patcher CLI.
 *
 * `config.ts` computes SYSTEM_PROMPTS_DIR / PROMPT_CACHE_DIR from env vars at
 * MODULE-INIT time, and `systemPromptDownload.ts` reads UNNERF_CATALOG_PATH.
 * ESM evaluates a module's imports in source order, depth-first, before the
 * importer's own body. `cli.mjs` imports THIS module first, so parsing argv and
 * setting the env vars here runs before the patcher graph (config, download)
 * initializes. Bundling with esbuild preserves that evaluation order.
 *
 * argv shape: [node, cli, 'apply', <inJs>, <catalog.json>, <systemPromptsDir>, <outJs>]
 * We only need the catalog (argv[4]) and prompts dir (argv[5]) here; cli.mjs
 * validates arity and handles the rest. Missing args are tolerated — the CLI
 * prints usage and exits before anything reads these.
 */
const argv = process.argv;
if (argv[2] === 'apply') {
  const catalog = argv[4];
  const promptsDir = argv[5];
  if (catalog) process.env.UNNERF_CATALOG_PATH = catalog;
  if (promptsDir) process.env.UNNERF_SYSTEM_PROMPTS_DIR = promptsDir;
}
