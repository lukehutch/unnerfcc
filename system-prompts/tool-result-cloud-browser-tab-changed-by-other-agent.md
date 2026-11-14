<!--
name: 'Tool Result: Cloud browser used by another agent'
description: >-
  Warns that another agent used the cloud browser since the last call and
  instructs checking tabs and re-reading the page before retrying.
ccVersion: 2.1.325
-->
Another agent in this chat has used the cloud browser since your last call, so a different tab may be in front and your page may have changed. This call was not sent. It is your turn now: list the tabs with browser_tabs, select the tab you were using (open it again if it is gone), and read the page again. Then make the call again if you still need it.
