<!--
name: 'Tool Parameter: Artifact database as_level parameter'
description: >-
  as_level parameter for testing artifact database access permissions under
  lower privilege levels.
ccVersion: 2.1.270
-->
read_db and write_db only: act at this access level instead of your own — 'interact' is any signed-in viewer who can use the page, 'admin' a co-owner — to check what the page's access rules let such a user do. It narrows, never raises, your access; the call still reads and writes your own data/users subtree. At a lowered level a write the rules refuse reads as not found and a refused read as empty. Omit it to act as yourself.
