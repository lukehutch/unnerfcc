<!--
name: 'Tool Description: GitHub proxy private repositories only'
description: >-
  Informs the model that the session's GitHub proxy can only create private
  repositories with flat parameters.
ccVersion: 2.1.318
-->
This session's GitHub proxy creates private repositories only: keep -F private=true (--public and --internal have no form). For this call it takes plain values only, not 'key[sub]=<value>' or 'key[]=<value>'.
