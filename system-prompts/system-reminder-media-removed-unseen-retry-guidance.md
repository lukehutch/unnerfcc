<!--
name: 'System Reminder: Media removed unseen retry guidance'
description: >-
  Notes that media was dropped before being seen and instructs retrying once if
  needed or proceeding without it.
ccVersion: 2.1.321
variables:
  - PREFIX
  - POSTFIX
-->
${PREFIX} You have not seen this: it did not fit in the request. If you need it, get it again once, by itself. If it is dropped again, go on without it and say so. ${POSTFIX}
