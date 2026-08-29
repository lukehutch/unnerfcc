<!--
name: 'System Reminder: Directory sync branch name conflict'
description: >-
  Informs the model of a branch namespace collision preventing user changes from
  being applied and explains how to resolve it.
ccVersion: 2.1.251
variables:
  - CONFLICT_DETAILS
-->
Directory sync: the user's latest changes were NOT applied because the user is now on a branch that cannot be created in THIS checkout while another branch here occupies part of its name — git stores branches as paths, so "feature" and "feature/v2" cannot coexist: ${CONFLICT_DETAILS}. Rename or delete the branch of this checkout that is in the way (git branch -m OLD OTHER-NAME, or git branch -D OLD if its commits are merged or parked), tell the user you did, and sync resumes at the next turn. Nothing in the checkout was changed.
