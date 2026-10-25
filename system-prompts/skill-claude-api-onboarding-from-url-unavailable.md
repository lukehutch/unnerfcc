<!--
name: 'Skill: Onboarding from URL unavailable'
description: >-
  Informs the model that onboarding from a URL is unavailable when skill files
  cannot be saved.
ccVersion: 2.1.310
-->
## Onboarding From a URL Unavailable

Setting up an agent from a page (`managed-agents-onboard <url>`, or a request in plain words to copy a setup from a cookbook, post or docs page) follows `shared/managed-agents-onboarding-from-url.md`, which isn't available this session. If the request is for that, tell the user it isn't possible right now because the skill's files couldn't be saved and that running `/claude-api` again will retry saving them, then stop without fetching the page or writing any files.
