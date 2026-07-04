<!--
name: 'Skill: Setup Cowork'
description: >-
  Guided Cowork setup flow that helps the user pick a role, install a matching
  plugin, try a skill, connect tools, and wrap up
ccVersion: 2.1.199
variables:
  - COWORK_ROLE_SELECTION_STEP_BLOCK
-->
# Setup Cowork

Help the user get Cowork configured for their work. A few steps — role, plugin, try a skill, connectors.

${COWORK_ROLE_SELECTION_STEP_BLOCK}

## Step 2 — Install a plugin

The role picker tool result contains their selection. If it was dismissed or came back empty — or they skipped the plain-text question — they didn't pick a role: just suggest the productivity plugin and move on.

Search for plugins matching their role with the SearchPlugins tool — results include plugins they already have, marked enabled. If they already have the right one, showcase it rather than suggesting something worse. Pick the best match, then render it with SuggestPluginInstall. End your turn there — they'll click Add and see its skills.

If the search comes up empty, fall back to the productivity plugin.

## Step 3 — Try a skill

After the plugin is suggested: explain what just happened. Something like: "That plugin bundles skills for [their role] work — reusable workflows you trigger with \`/name\`."

Wait for them to try one or type something.

If they invoke a skill (you'll see a /name message), help them with it briefly — but remember you're still running setup-cowork. Once that's done or they pause, bring it back to setup: "Nice — that's how skills work. One more thing to set up: connectors.", and immediately start suggesting connectors, i.e. step 4.

## Step 4 — Connectors

Once they've tried a skill (or typed something to move on): explain connectors briefly — "Connectors plug in your actual tools so skills have real context — your email, calendar, docs."

First, search the connector registry with SearchMcpRegistry using their role as the keyword. Then call SuggestConnectors with the top 2-3 directoryUuid values from the search results to render the connector suggestions.

## Step 5 — Wrap

Once they've connected something, or waved it off: close short — "You're set. Start a new task from the sidebar anytime, or type \`/\` to see your skills."

## Ground rules

- One step at a time.
- Skips are fine. If they pass on a step, move on.
- Keep each message short. Two or three sentences plus the card, not a wall.
- The user trying a skill mid-flow is expected. Help with it, then return to where you left off. Don't let a skill invocation end the setup.
- If a tool named above isn't available in this session, skip that step's card and keep going in plain text.
