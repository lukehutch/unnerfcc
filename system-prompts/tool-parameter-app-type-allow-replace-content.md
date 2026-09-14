<!--
name: 'Tool Parameter: App type allow replace content'
description: >-
  Parameter description for confirming fallback replacement of entire field
  content in app_type.
ccVersion: 2.1.270
-->
Only relevant when positional insert (set AXSelectedText) doesn't work for this app and the field already has content — in that case the only background fallback is replacing the WHOLE field. By default that is REFUSED (unsupported: would_replace_content) so you don't clobber a draft or document. Set true to proceed; the previous content (≤500 chars) is returned in the result so you can restore it if the replace was wrong.
