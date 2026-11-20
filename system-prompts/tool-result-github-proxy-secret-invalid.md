<!--
name: 'Tool Result: GitHub proxy session secret missing or invalid'
description: >-
  Reports that the GitHub proxy rejected gh because the session secret file is
  missing, unreadable, or outdated, advising one retry before stopping.
ccVersion: 2.1.329
-->
this session's GitHub proxy did not accept this gh: the file with the session's secret, beside the CA bundle, is missing, unreadable or out of date. Run the command once more; if it fails again, stop: the built-in gh cannot be used until this session's GitHub proxy starts again
