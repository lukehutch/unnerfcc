<!--
name: 'Tool Description: Artifact publish inline edits guidance'
description: >-
  Guides sending small changes as edits directly in the publish call instead of
  editing the file first.
ccVersion: 2.1.310
-->
 For a small change to a page published from a file in this conversation, Claude can send the change as `edits` on the publish call itself (old_str/new_str pairs copied exactly from the file as it now stands) instead of editing the file first.
