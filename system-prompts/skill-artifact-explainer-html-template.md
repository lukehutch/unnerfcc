<!--
name: 'Skill: artifact-explainer HTML template'
description: >-
  Bundled template.html for the artifact-explainer skill — the title/lede +
  numbered-steps-or-sections + recap shell with CDS color tokens and SLOT
  markers the model fills in.
ccVersion: 2.1.219
-->
<!-- Artifact-tool body fragment — no <!DOCTYPE>/<html>/<head>/<body> wrapper. See SKILL.md for slot guidance. -->
<title><!-- SLOT: TITLE — plain text, e.g. "How does a Bloom filter work?" — becomes the browser-tab title; fill this AND the <h1> below -->Explainer</title>
<style>
  /* Color values from the Claude Design System (CDS) purpose tokens:
     --bg=surface-0, --ink=text-primary, --ink-soft=text-secondary,
     --line=border, --card=surface-1, --accent=text-accent.
     --accent-soft is derived from --accent so "tune --accent" keeps
     working; the dark block must mirror any light-block additions. */
  :root {
    color-scheme: light;
    --bg: #f9f9f7;
    --ink: #0b0b0b;
    --ink-soft: #52514e;
    --line: rgba(11, 11, 11, 0.1);
    --card: #fcfcfb;
    --accent: #184f95;
    --accent-soft: color-mix(in srgb, var(--accent) 12%, var(--bg));
    --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    font-family: ui-sans-serif, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  /* Dark theme, both ways the viewer signals it: the OS preference (unless
     the viewer toggle pinned light) and the toggle's data-theme stamp. */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      color-scheme: dark;
      --bg: #0d0d0d;
      --ink: #ffffff;
      --ink-soft: #c3c2b7;
      --line: rgba(255, 255, 255, 0.1);
      --card: #1a1a19;
      --accent: #6da7ec;
    }
  }
  :root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #0d0d0d;
    --ink: #ffffff;
    --ink-soft: #c3c2b7;
    --line: rgba(255, 255, 255, 0.1);
    --card: #1a1a19;
    --accent: #6da7ec;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-size: 16px; line-height: 1.65; }
  .wrap { max-width: 760px; margin: 0 auto; padding: 64px 24px 96px; }

  header { margin-bottom: 48px; }
  h1 { margin: 0 0 14px; font-size: 34px; font-weight: 650; line-height: 1.15; letter-spacing: -0.01em; text-wrap: balance; }
  .lede { font-size: 18px; color: var(--ink-soft); margin: 0; max-width: 60ch; }

  ol.steps { list-style: none; counter-reset: step; margin: 0; padding: 0; }
  li.step {
    counter-increment: step; position: relative;
    padding: 28px 0 28px 56px; border-top: 1px solid var(--line);
  }
  li.step:first-child { border-top: none; }
  li.step::before {
    content: counter(step);
    position: absolute; left: 0; top: 28px;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--accent-soft); color: var(--accent);
    font-weight: 600; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
  }
  /* line-height matches the 36px step circle so their centers align on the
     first line; wrapped title lines keep the same leading. */
  .step h2 { margin: 0 0 10px; font-size: 21px; font-weight: 600; line-height: 36px; }
  .step p { margin: 0 0 14px; max-width: 62ch; }

  .sections { margin: 0; }
  section.topic { padding: 26px 0; border-top: 1px solid var(--line); }
  section.topic:first-child { border-top: none; padding-top: 0; }
  .topic h2 {
    margin: 0 0 10px; font-size: 21px; font-weight: 600; line-height: 1.3;
    padding-left: 14px; border-left: 3px solid var(--accent);
  }
  .topic p { margin: 0 0 14px; max-width: 62ch; }

  .visual {
    margin: 18px 0 6px; padding: 18px;
    background: var(--card); border: 1px solid var(--line); border-radius: 8px;
    overflow-x: auto;
  }
  .visual svg { display: block; max-width: 100%; height: auto; }
  .visual pre { margin: 0; font-family: var(--mono); font-size: 14px; line-height: 1.55; }
  .visual code { font-family: var(--mono); }
  .callout { font-size: 14px; color: var(--ink-soft); margin-top: 10px; }

  .recap { margin-top: 48px; padding: 24px 28px; background: var(--accent-soft); border-radius: 10px; }
  .recap h2 { margin: 0 0 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); }
  .recap ul { margin: 0; padding-left: 20px; }
  .recap li { margin: 6px 0; }

  @media (max-width: 640px) {
    .wrap { padding: 40px 18px 72px; }
    h1 { font-size: 27px; }
    li.step { padding-left: 48px; }
    li.step::before { width: 32px; height: 32px; font-size: 14px; }
    /* keep the first-line center on the shrunken 32px circle */
    .step h2 { line-height: 32px; }
  }
</style>

<article class="wrap">

  <header>
    <h1><!-- SLOT: TITLE — phrase as the reader's question, e.g. "How does a Bloom filter work?" -->How does it work?</h1>
    <p class="lede"><!-- SLOT: LEDE — 2–3 sentences: what the reader will understand by the end, and why it matters. -->In a few steps you'll see how the pieces fit together.</p>
  </header>

  <!-- SLOT: BODY — TWO structures below; keep exactly ONE and delete the
       other entirely (including its wrapper element). Numbered steps teach a
       progression start-to-finish (the default). Sections tour a system,
       change, or architecture — code-forward, looser order. -->
  <ol class="steps">
    <!-- SLOT: STEPS
         Emit 3–6 <li class="step"> blocks. Each step = one idea.
         Structure: <h2> heading, 1–3 short <p> paragraphs, then a .visual block
         containing whatever best illustrates the point — an inline <svg> diagram,
         a <pre> code example, or an annotated snippet. -->
    <li class="step">
      <h2>Step heading</h2>
      <p>One or two short paragraphs explaining this idea in plain language.</p>
      <div class="visual">
        <pre>example or diagram goes here</pre>
      </div>
      <p class="callout">Optional aside — a gotcha, an analogy, or a link onward.</p>
    </li>
    <!-- repeat li.step per concept -->
  </ol>
  <div class="sections">
    <!-- SLOT: SECTIONS
         Optionally open with ONE wide architecture or flow diagram in a
         .visual, when the subject has a structural story. Then 2–7
         <section class="topic"> blocks, cut at the material's joints —
         each an <h2>, short prose, and .visual blocks where the code
         snippet is usually the subject matter itself; add a diagram only
         where structure or flow genuinely needs one. -->
    <section class="topic">
      <h2>Topic heading</h2>
      <p>One or two short paragraphs in plain language.</p>
      <div class="visual">
        <pre>code snippet (or a diagram where flow needs one)</pre>
      </div>
    </section>
    <!-- repeat section.topic per topic -->
  </div>

  <section class="recap">
    <h2>In short</h2>
    <ul>
      <!-- SLOT: RECAP — 3–5 <li> restating the core takeaways in the reader's new vocabulary. -->
      <li>Key takeaway.</li>
    </ul>
  </section>

</article>
