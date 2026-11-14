<!--
name: 'Tool Result: Connector download received web page instead of file'
description: >-
  Model-facing connector download error explaining that storage returned an HTML
  page such as a sign-in prompt instead of the file.
ccVersion: 2.1.325
-->
the connector's storage sent a web page instead of the file (such as a sign-in page, if its link has expired or needs a sign-in); running the tool again asks the connector for a new link, which may work
