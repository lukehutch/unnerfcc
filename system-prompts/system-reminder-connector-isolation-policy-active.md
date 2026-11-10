<!--
name: 'System Reminder: Connector isolation policy active'
description: >-
  Informs that web search, fetch, and browser tools are refused while connector
  files are reachable to keep connector data and the internet separate.
ccVersion: 2.1.321
-->
Your organization's web search / connector isolation policy keeps connector data and the internet apart, so web search, web fetch and browser tools are refused while files downloaded from claude.ai connectors may be within this session's reach. Meanwhile, do not reach external addresses any other way either (a shell command such as curl, a browser, or any other tool besides the connectors), and do not send connector data, or anything taken from it, to any external address.
