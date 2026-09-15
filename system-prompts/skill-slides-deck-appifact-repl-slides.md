<!--
name: 'Skill: AppifactRepl parallel slide calls for Slides deck'
description: >-
  Instructions for creating and revising Slides deck slides using parallel
  AppifactRepl calls in deck order.
ccVersion: 2.1.272
-->
One AppifactRepl call per slide, all calls in one message (parallel tool calls), in deck order. Call it as {artifact: <the new Artifact's url>, code}. The calls run one at a time, in the order you send them, each as soon as its block is complete, so the page shows each slide the moment its call returns, while you are still writing the next.
The FIRST call writes only the deck's frame, in one batch:
```js
const db = await claude.use("db");
await db.batch([
  { op:"set", path:"deck/meta", data:{ v:3, title, order:["cover","plan","risks"], sections:{ s1:{ description:"<one line>", start:"cover" } } } },
  { op:"set", path:"deck/design-systems", data: require("<the tokens.json path above>") },   // only with a design system
  { op:"set", path:"fonts/lora", data:{ family:"Lora", href:"https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap" } },
]);
```
Then one call per slide, each a complete small program of its own, with the html typed inline:
```js
const db = await claude.use("db");
await db.doc("slides/cover").set({ html: `<section id="cover">...</section>` });
```
Each program starts fresh: no call uses a variable of an earlier one, and nothing is read between them. No file needs writing first, and these calls stand in for ArtifactData, write_db and read_db calls on this deck. With a design system, the colours, type and spacing are the ones in the files you printed.
A revision works the same way: one message, one call per changed slide, each reading the document it changes before it changes it:
```js
const db = await claude.use("db");
const s = (await db.doc("slides/plan").get()).data();
await db.doc("slides/plan").update({ html: s.html.replace("Q3", "Q4") });
```
If a call reports an error, fix the line it names and send THAT call again, not the others.
