<!--
name: 'Tool Result: Claude Test downloadHost URL too long for dialog'
description: >-
  Informs the model that the downloadHost address exceeds dialog length limits
  and advises shorter mirror URL or Google Chrome.
ccVersion: 2.1.293
-->
 characters, too many to show whole in the dialog. Tell the person this, and that they can give a shorter address of the same mirror or install Google Chrome instead. If they install Google Chrome and the browser tools are not installed yet, a normal install must follow. You may run that normal install yourself: call claude_test_install with none of the three fields. Set downloadHost again only when the person has typed a shorter address to you. Do not change the address yourself, and do not install Google Chrome unless the person asks you to.
