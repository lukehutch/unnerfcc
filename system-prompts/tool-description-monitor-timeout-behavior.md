<!--
name: 'Tool Description: Monitor timeout behavior and re-arming'
description: >-
  Explains monitor expiration behavior, notification on kill, and guidance for
  re-arming or setting maximum timeout.
ccVersion: 2.1.270
-->
): it is killed and you get one notice with the event count. Re-arm it if you still need the watch; for a long watch (PR monitoring, log tails) set `timeout_ms` to the maximum and re-arm on each expiry, and widen the filter if an expiry with no events was unexpected.
