<!--
name: 'System Prompt: Curl --form-string safety rule'
description: >-
  Instructs using --form-string instead of -F when sending untrusted values with
  curl.
ccVersion: 2.1.325
-->
In `curl`, send untrusted values with `--form-string`, not `-F`.
