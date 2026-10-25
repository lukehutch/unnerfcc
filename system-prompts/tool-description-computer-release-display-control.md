<!--
name: 'Tool Description: Computer release_display_control'
description: >-
  Describes releasing display control lock and reverting to background
  application control.
ccVersion: 2.1.310
-->
Drop back to BACKGROUND control: releases the display lock (screen glow off) and clears the full-screen approval so your NEXT full-screen action will ask again. Call this when you're done with full-screen work and want to keep going with the app_* tools without the takeover overlay. No user prompt — releasing is always safe. Has no effect if you never held full-screen control.
