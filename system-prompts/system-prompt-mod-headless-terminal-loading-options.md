<!--
name: 'System Prompt: Mod headless loading without terminal'
description: >-
  Explains how to load mods via command line flags when hot reloading is
  disabled in headless environments.
ccVersion: 2.1.310
variables:
  - HOT_RELOAD_STATUS
-->
THIS SESSION draws in no terminal of its own: a program started it, and a pane is seated by a surface it attaches, if any. Where hot reloading is off as ${HOT_RELOAD_STATUS}, the mod loads in a session started with `--plugin-dir <mod folder>`, or one with the folder named in `CLAUDE_CODE_PLUGIN_DIRS`.
