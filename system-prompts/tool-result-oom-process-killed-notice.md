<!--
name: 'Tool Result: Kernel killed process for lack of memory'
description: >-
  Notice explaining that the kernel killed a process due to memory limits and
  advising running fewer workers in parallel.
ccVersion: 2.1.318
-->
[While this command ran, the kernel killed at least one process for lack of memory. All commands in this session share one memory limit. The killed process may have been a worker that a test or build runner replaced, so this output may not show it. It may also have belonged to another command, a background task or another program under the same limit. If this command was the heavy one, run fewer workers in parallel, or a smaller part at a time.]
