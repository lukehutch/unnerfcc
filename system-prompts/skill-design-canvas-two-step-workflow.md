<!--
name: 'Skill: Design canvas in two steps'
description: >-
  Two-step workflow for creating a Design canvas using preloaded disk files and
  parallel AppifactRepl calls.
ccVersion: 2.1.272
-->
[This canvas in two steps] Everything this canvas needs is already on disk, in the files listed with this note and with your design system's note. Two steps make the design.

Step 1, one message: the Bash call or calls given with those lists, if any, copied as they are. In that same message, read this artifact's url with the Artifact tool (the read call given below, the url alone, no path): it returns the type's instructions (SKILL.md) and records that you have seen this version. Unless the user says they have written in it, the canvas is new and empty: the read is for the instructions and the version, not for content. You do not need the ArtifactData tool, Read, Skill or ToolSearch for any of this, nor a second read step: everything else is already printed. Where this session's opening lines or the printed instructions tell you to read_file the design system's README.md, tokens.json or a card, or to read one of the type's reference pages, that reading is this step: those files are on disk, and the ones you need are the ones you have just printed.

Step 2, one message: this canvas's files were listed before this turn and `canvas.json` is not among them, so its content is in the store and the section below needs no list call from you. For this NEW canvas, where that section says "Create: one call", send instead one AppifactRepl call per artboard, ALL in this one message (parallel tool calls), in reading order. The FIRST call writes only the canvas's frame, in one batch:
```js
const db = await claude.use("db");
await db.batch([
  { op:"set", path:"design/meta", data:{ v:2, title, boardOrder:["Main.dc.html","Pricing.dc.html"], launch:{view:"canvas"} } },
  { op:"set", path:"design/design-systems", data: require("<the tokens.json path listed with your design system's files>") }, // only with a design system
  { op:"set", path:"boards/Main.dc.html",    data:{ path:"Main.dc.html",    x:0,   y:0, w:880, h:560, html:"" } },
  { op:"set", path:"boards/Pricing.dc.html", data:{ path:"Pricing.dc.html", x:960, y:0, w:880, h:560, html:"" } },
]);
```
Then one call per artboard, each a complete small program of its own, with the `html` typed inline:
```js
const db = await claude.use("db");
await db.doc("boards/Main.dc.html").update({ html: `<div>...</div>` });
```
Each program starts fresh: no call uses a variable of an earlier one, and nothing is read between them. The calls run one at a time, in the order you send them, each as soon as its block is complete, so the page shows each artboard the moment its call returns, while you are still writing the next: send them in the order a reader would want to see them. No file needs writing first, and these calls stand in for ArtifactData, write_db and read_db calls on this canvas. With a design system, the colours, type and spacing are the ones in the files you printed.
Make the design with markup in these two steps unless the user asked for the real components by name; the type's design-system-components page, which is on disk, says how.
A revision works the same way: one message, one call per changed artboard, each reading the document it changes before it changes it.

If a call reports an error, fix the line it names and send THAT call again, not the others; neither write_db nor a read of the artifact is needed for that. If a later listing does show `canvas.json`, the canvas has moved to files: from then on do what the section below says for that case.
