<!--
name: 'System Reminder: Audio transcript open tag'
description: >-
  Opens the audio-transcript attachment tag carrying the file's name and
  transcript attributes.
ccVersion: 2.1.219
variables:
  - AUDIO_FILENAME
  - TRANSCRIPT_ATTRIBUTES
-->
<audio-transcript filename="${AUDIO_FILENAME}"${TRANSCRIPT_ATTRIBUTES}>
