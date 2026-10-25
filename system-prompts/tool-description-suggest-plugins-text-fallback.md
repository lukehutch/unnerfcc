<!--
name: 'Tool Description: Suggest Plugins Text Fallback'
description: >-
  Instructs the model to name suggested plugins in text in case the user's
  client does not render the suggestion card.
ccVersion: 2.1.310
-->
The user's app may not draw this card. So when the call returns something to suggest, also name it in one short sentence, such as "I've suggested the Acme plugin.", and say nothing more about it. This overrides any line above about not describing it in text.
