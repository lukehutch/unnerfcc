<!--
name: 'System Reminder: Cross-session delivery refused'
description: >-
  Delivery notice stating that cross-session messages were refused by the
  recipient session.
ccVersion: 2.1.251
variables:
  - COUNT_OR_ARTICLE
  - MESSAGE_NOUN
  - REASON_CLAUSE
-->
[Cross-session delivery notice] ${COUNT_OR_ARTICLE} ${MESSAGE_NOUN} refused${REASON_CLAUSE}: that session is not accepting cross-session messages (the feature is off there, or a setting or policy there refuses them). Not delivered to that session's Claude. Do not wait for a reply and do not resend; tell the user, or choose another approach.
