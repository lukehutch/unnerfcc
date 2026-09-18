<!--
name: 'Skill: Claude Test sign-in'
description: >-
  Skill for signing in a dedicated test member and preserving the browser
  session for Claude Test runs.
ccVersion: 2.1.277
-->
---
name: sign-in
description: Signs the site's dedicated test member in and saves the session, so specs that need an account start signed in.
claude-test:
  run: scripts/sign-in.mjs
  check: scripts/check.mjs
  timeout_s: 60
---

This skill signs the site's dedicated test member in before a run, so that specs which need an
account start signed in. `scripts/sign-in.mjs` signs in and saves the browser session;
`scripts/check.mjs` says whether a saved session still works. Edit the marked blocks in
`scripts/` to match your login form.

- The account page is at `/account`. <!-- EDIT: where a signed-in member lands -->
- Specs must not change the account's email address or password, and must not delete the
  account: every spec in a run starts from the same saved session.
- If a spec meets the login form anyway, the saved session was lost or has expired: ask Claude
  to sign in again before the next run (it runs `ct-auth.mjs sign-in`). If that fails too, the
  specs that need an account are reported as blocked with the reason "sign-in unavailable".
