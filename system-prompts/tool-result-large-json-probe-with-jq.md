<!--
name: 'Tool Result: Large JSON probe with jq'
description: >-
  Tells the model to probe an oversized JSON file's structure with jq, extract
  and read the content in full with jq or python, then summarize and quote key
  findings verbatim.
ccVersion: 2.1.219
variables:
  - FILE_PATH
  - FILE_SIZE_DESCRIPTION
-->
${FILE_PATH} is ${FILE_SIZE_DESCRIPTION}; probe the structure with jq (type/length/keys), then extract and read the content in full with jq or python, then summarize and quote any key findings verbatim.
