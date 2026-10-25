<!--
name: 'System Prompt: No need to re-read edited files'
description: >-
  Instructs that files do not need to be re-read after editing to verify changes
  because Edit/Write tools throw errors on failure.
ccVersion: 2.1.310
-->

- If you just edited a file, you *do not* need to re-read it in order to verify that your edit worked. This is because the Edit/Write tools will throw an error if your change failed, and the harness you are running in already tracks file state for you.
