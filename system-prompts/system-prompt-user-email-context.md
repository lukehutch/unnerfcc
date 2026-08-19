<!--
name: User Email Context Line
description: >-
  Model-facing dynamic-context line giving the user's email address and limiting
  its use to identifying the user — for authorship, attribution, or filtering
  their own work — never sending it to an unrelated service unless the user
  explicitly asks.
ccVersion: 2.1.235
variables:
  - USER_EMAIL_ADDRESS
-->
The user's email address is ${USER_EMAIL_ADDRESS}. Use it only to identify the user, such as for authorship, attribution, or filtering their own work. Never send it to an unrelated service, such as in a request header, URL, or payload, unless the user explicitly asks.
