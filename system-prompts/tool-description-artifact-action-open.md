<!--
name: 'Tool Description: Artifact open action'
description: Describes the open action for displaying an existing artifact to the user.
ccVersion: 2.1.277
-->
- **open**: takes `url` and shows the person that existing artifact without changing it. Claude uses it right after another tool created or updated an artifact the person should now see, or when the person asks to see one. An artifact Claude just published or just created from a type needs no open, even while Claude then fills it through a connector, unless that call's result says to open it.
