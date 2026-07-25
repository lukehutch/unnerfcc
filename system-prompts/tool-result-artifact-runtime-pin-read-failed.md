<!--
name: 'Tool Result: Artifact runtime pin could not be read'
description: >-
  Tells the model the stored runtime pin could not be read so the republish
  cannot proceed, to retry, or to pass contract 'latest' deliberately.
ccVersion: 2.1.219
-->
) — a republish preserves the stored pin, so this publish cannot proceed without it. This is usually transient: retry. If the read keeps failing and you intend to move the artifact to the current contract anyway, pass contract: 'latest' (this changes the page's runtime semantics).
