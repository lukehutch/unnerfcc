<!--
name: 'Tool Description: PowerShell sleep — polling and duration'
description: >-
  PowerShell tool guidelines for polling external processes and keeping sleep
  durations short.
ccVersion: 2.1.310
-->

    - If you must poll an external process, use a check command rather than sleeping first.
    - If you must sleep, keep the duration short to avoid blocking the user.
