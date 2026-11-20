<!--
name: 'Skill: Update config all settings header'
description: >-
  Introduces the settings.json key summary in the config skill and instructs
  reading schema/<key>.json before writing unfamiliar keys.
ccVersion: 2.1.329
-->


## All Settings

Every top-level key of settings.json, with the start of its description. Before you write a key whose exact shape is not shown above, Read `schema/<key>.json` in this skill's base directory (for example `schema/sandbox.json`): it holds the key's full description and JSON schema, nested keys included. Read only the keys you need. The directory does not survive a resume: if a Read fails, load this skill again for a new one.

