<!--
name: 'Tool Result: Artifact DB Write Reads Local Files Only'
description: Explains that write_db requires local files and rejects network share paths.
ccVersion: 2.1.251
-->
write_db reads only local files — a network path (UNC share, /net automount, or device-style path) cannot be sent; copy the file onto a local disk first
