<!--
name: 'Tool Parameter: Goal ask_user'
description: >-
  Describes the ask_user input that controls whether an approval dialog is shown
  before the goal is set, and the narrow case for setting it false.
ccVersion: 2.1.231
-->
Whether to ask the user for approval before the goal is set. Defaults to true — an approval dialog is shown. Set false ONLY when the user's own words in this conversation stated this outcome as what they want; the goal is then set directly, with a visible notice in the transcript, and the user can clear it with /goal clear.
