<!--
name: 'Tool Result: Claude Test report unprintable characters exceeded'
description: >-
  Error stating report contains unprintable characters exceeding size limits
  when expanded.
ccVersion: 2.1.310
variables:
  - UNPRINTABLE_COUNT
  - EXPANDED_BYTES
  - LIMIT_BYTES
-->
: the report holds ${UNPRINTABLE_COUNT} characters that cannot be shown, and with each written out as its code point it is ${EXPANDED_BYTES} bytes; the limit is 4 MiB (${LIMIT_BYTES} bytes). Leave out copied page text, and call again with the whole report.
