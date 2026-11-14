<!--
name: 'Tool Parameter: Device write expectedMtimeMs'
description: >-
  Describes the optional mtimeMs guard parameter that refuses writes if the
  device file was modified since staging.
ccVersion: 2.1.325
-->
If set, refuse to write when the device file's mtime has changed since this value (use mtimeMs from device_stage_files)
