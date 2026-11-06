<!--
name: 'System Reminder: Mod hot-reloading hooks not loaded'
description: >-
  Notifies that hook modules under the directory failed to load despite
  hot-reloading being enabled.
ccVersion: 2.1.318
variables:
  - MODS_DIRECTORY
-->
The person enabled mod hot-reloading for this session, but the hooks modules of the mods under ${MODS_DIRECTORY} had NOT loaded when this notice was written. They count as a person's hooks modules, not an organization's. The reason: 
