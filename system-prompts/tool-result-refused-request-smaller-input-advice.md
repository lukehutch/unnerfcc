<!--
name: 'Tool Result: Refused request smaller input advice'
description: >-
  Advises simplifying or flattening input rather than retrying an unchanged
  rejected request.
ccVersion: 2.1.318
-->
Sending it again unchanged will not help. If its input is large or deeply nested, a call with a smaller or flatter input may go through; if not, tell the user instead of retrying.
