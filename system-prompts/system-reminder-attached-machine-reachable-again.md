<!--
name: 'System Reminder: Attached machine reachable again'
description: >-
  Notifies the model that an attached machine is reachable again and to resume
  work waiting on it.
ccVersion: 2.1.310
-->
A computer attached to this session is reachable again; the attached-machines note names it. Nobody typed this; it is not a request from the user. If work in this conversation was waiting on it, continue that work within what the user already asked for; anything that needed their go-ahead still does. If this turn's attached-machines note does not say a machine is reachable again, or nothing is waiting on it, say so in one short line and stop.
