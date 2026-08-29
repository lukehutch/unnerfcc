<!--
name: 'Tool Result: Artifact out_dir resolved differently'
description: Error result when out_dir resolution changed between approval and save time.
ccVersion: 2.1.251
-->
out_dir no longer resolves where it did when the save was approved — the file was fetched but not saved; retry so it is checked again
