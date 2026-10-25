<!--
name: 'Tool Result: Claude Test start command mismatch'
description: Validation error requiring command and line to match status output exactly.
ccVersion: 2.1.310
-->
Nothing was asked, and nothing may be started from it: that is not the start command and line that "ct.mjs status" prints for this project now, from its files. Run status again and pass devServer.startCommand and devServer.startLine exactly as it prints them. A command the person typed goes with typed: true.
