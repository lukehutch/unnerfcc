<!--
name: 'Tool Result: Plugin card unavailable on mobile app'
description: >-
  Model-facing note explaining that the iOS and Android apps do not display the
  plugin card, unlike web and desktop apps.
ccVersion: 2.1.329
variables:
  - MOBILE_FALLBACK_GUIDANCE
-->
When this call was made, the user's latest message had come from the Claude iOS or Android app. Those apps do not show this card, so the user saw no card there. The Claude web and desktop apps can show it in this conversation. The tool description's line about not describing plugins in text assumes a card that the user can see. ${MOBILE_FALLBACK_GUIDANCE}
