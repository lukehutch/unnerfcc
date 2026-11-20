<!--
name: 'System Reminder: Container memory limit cgroup note'
description: >-
  Model-facing note explaining that the container memory limit may have changed
  and must be checked under /sys/fs/cgroup rather than with free.
ccVersion: 2.1.329
-->
 container limit. It may have changed since. `free` does not show that limit; the memory files under /sys/fs/cgroup do.
