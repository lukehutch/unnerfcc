<!--
name: 'Tool Result: Browser tool invalid arguments'
description: >-
  Model-facing error rejecting a browser tool call with unexpected or invalid
  arguments and instructing how to resend with valid scalar or list arguments.
ccVersion: 2.1.329
-->
Nothing was saved or uploaded. The call has an argument that this tool does not take, or one that is not valid. Call it again with only the listed arguments, each as text, a number or a flat list of text, without a files argument, and with device, ref and tabId copied exactly from where you read them (tabId may be left out). If you sent nothing else, a hook added it: tell the user, and do not retry.
