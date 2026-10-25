<!--
name: 'Tool Description: claude_test_browser_installed'
description: >-
  Prompts the user with a native dialog to install the test browser and manages
  the installation.
ccVersion: 2.1.310
-->
Ask the person, in a dialog of Claude Code's own, whether to install the test browser now (onboarding, "Machine", tools.browser.missing), in place of the terminal command. Call it with project as status's projectDir, and write nothing before it. It asks only while this machine has no test browser, as status finds, and not while Claude Code is set to essential network traffic only. The dialog asks "Install the test browser (Chromium, about <n> MB) from Playwright's download servers?", ends in "Accept: download and install it now. Decline: don't install it." and has those two buttons. On Accept the helper installs it itself (the browser tools too, when they are missing) and reports how far it got as the call's progress; the call answers when the install has ended. The answer is "installed" (Accept, and the install worked), "install-failed" (Accept, with cause and the one line to say), "stop" (Decline), or answer null when neither came. A background run never calls it.
