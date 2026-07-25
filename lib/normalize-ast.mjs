// AST normalizer — collapses every spelling of a string into ONE canonical form.
//
// WHY
// ---
// The same prompt is spelled differently across releases: `"a"+x+"b"` one build,
// `` `a${x}b` `` the next, single quotes here, double quotes there. Hashing the
// source text of those makes the same prompt look like three different strings.
// Normalizing the AST first collapses them into a single representation, so a
// plain sha256 of one rendered string is a stable identity — no runs, no fuzzy
// matching, no source spans.
//
// NORMAL FORM
// -----------
// After normalizeProgram(), every string-producing expression is a TemplateLiteral
// (backticks only — no StringLiteral survives outside the positions where a
// backtick is syntactically illegal), and each TemplateLiteral is exactly one of:
//
//   SIMPLE   every interpolation is a bare Identifier      -> `a${x}b`
//   OPAQUE   a single interpolation, nothing else          -> `${f(x)}`
//
// A more complex interpolation is hoisted out into a `+` chain as its own OPAQUE
// template, which is what makes the form stable: the fold below absorbs SIMPLE
// templates but never OPAQUE ones, so `` `a${f(x)}b` `` becomes
// `` `a` + `${f(x)}` + `b` `` and stays there.
//
// Wrapping the hoisted expression in its own template rather than dropping it
// bare into the chain is deliberate: `` `${e}` `` is ToString(e), whereas a bare
// `"a" + e` is ToPrimitive(e, default) — for an object with a meaningful valueOf
// those differ. Keeping the template wrapper makes the hoist exactly
// semantics-preserving.
//
// IDEMPOTENCY
// -----------
// normalizeProgram is a fixed point: re-running it over its own output is a
// no-op, and generating -> reparsing -> renormalizing reproduces byte-identical
// source. `.rt2` proved that on the real 21.6MB bundle. Every rule below is
// written to converge rather than oscillate; see fold() for the one place where
// that needed care.
//
// ASCII
// -----
// The stock bundle is pure ASCII — it spells every non-ASCII character as a
// \uXXXX escape. We keep that invariant. Babel preserves `extra.raw` for string
// and template literals, but an Identifier carries only `.name`, so a source
// identifier written `español` regenerates as raw `español`; the repacked
// binary then dies with `SyntaxError: Invalid character '±'` (Bun reading
// the second UTF-8 byte of `ñ` on its own). escapeNonAsciiIdentifiers() puts the
// escape back.

const HAS_NON_ASCII = /[^\x00-\x7F]/;

// Everything outside printable ASCII becomes \uXXXX — C0 controls, U+2028/9 and
// non-ASCII prose alike. This matches how the stock bundle already spells them,
// and keeps the emitted bundle byte-for-byte ASCII. Astral characters are UTF-16
// code units here, so a surrogate pair emits as two \uXXXX escapes — same string.
export function escapeCommon(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/[^ -~]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
}

// A whole double-quoted literal, delimiters included — used when writing a
// StringLiteral back out (patching one, or de-normalizing a slotless template).
export const encodeQuoted = (s) => '"' + escapeCommon(s).replace(/"/g, '\\"') + '"';

// Bare template-quasi source, no delimiters. A backtick would close the template
// and `${` would open an interpolation, so both must be escaped. A raw CR must
// NOT survive here: the cooked value of a template normalizes CRLF/CR to LF, so
// a literal CR would silently rewrite the string — escapeCommon's \uXXXX rule
// already covers it, since CR is outside printable ASCII.
export function encodeTemplateRaw(s) {
  return escapeCommon(s).replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const templateElement = (cooked, tail) => ({
  type: "TemplateElement",
  value: { raw: encodeTemplateRaw(cooked), cooked },
  tail,
});

// Build a TemplateLiteral from alternating text runs and slot expressions.
// `texts` is always one longer than `exprs`.
export function makeTemplate(texts, exprs) {
  return {
    type: "TemplateLiteral",
    quasis: texts.map((s, i) => templateElement(s, i === texts.length - 1)),
    expressions: exprs,
  };
}

// ---------------------------------------------------------------------------
// Classification of normalized nodes
// ---------------------------------------------------------------------------
const isTemplate = (n) => n && n.type === "TemplateLiteral";
const isSimpleSlot = (e) => e && e.type === "Identifier";
// A SIMPLE template is the hashable unit: literal text plus bare variable slots.
export const isSimpleTemplate = (n) => isTemplate(n) && n.expressions.every(isSimpleSlot);
// An OPAQUE template is the wrapper around a hoisted complex expression. It has
// no literal text of its own, so it never carries prompt content.
export const isOpaqueTemplate = (n) =>
  isTemplate(n) && n.expressions.length === 1 && !n.expressions.every(isSimpleSlot);

const cookedOf = (q) => (q.value.cooked !== undefined && q.value.cooked !== null ? q.value.cooked : q.value.raw);

// ---------------------------------------------------------------------------
// Canonical text — the single string that gets hashed
// ---------------------------------------------------------------------------
// A slot renders as a BARE `${}` — no name and no index. The variable behind it
// never reaches the hash, so minified identifier churn between releases
// (`Wv` -> `q3`) cannot change a string's identity, and neither can a minifier
// deciding to reuse one variable where the previous build used two. What the hash
// keeps is the literal text and the NUMBER and POSITION of the interpolations.
//
// The cost of dropping the index is deliberate: `` `${a}${b}` `` and
// `` `${a}${a}` `` render to the same canonical text. The literal text carries
// essentially all of a prompt's identity, so this trades a sliver of
// discrimination for immunity to that churn.
//
// Literal `${` in the text is escaped so it can never be confused with a slot
// marker, which keeps the encoding injective — two different strings can never
// render to the same canonical text.
export const SLOT = "${}";
export const escapeMarkers = (s) => s.replace(/\\/g, "\\\\").replace(/\$\{/g, "\\${");

export function canonicalText(node) {
  // A quoted literal survives normalization only where a backtick is illegal
  // (object keys, module specifiers). It has no slots, so its canonical text is
  // just its escaped value — the same space every template renders into, so the
  // same content hashes the same however it had to be spelled.
  if (node && node.type === "StringLiteral") return escapeMarkers(node.value);
  if (!isSimpleTemplate(node)) return null;
  let out = "";
  for (let i = 0; i < node.quasis.length; i++) {
    out += escapeMarkers(cookedOf(node.quasis[i]));
    if (i < node.expressions.length) out += SLOT;
  }
  return out;
}

// The DISTINCT slot names, in first-occurrence order. Not part of the hash — this
// is what gives each slot a stable human label in the `.md` (a variable used
// twice gets the same name in both places).
export function slotNames(node) {
  const order = [];
  for (const e of node.expressions || []) if (e.type === "Identifier" && !order.includes(e.name)) order.push(e.name);
  return order;
}

// Per-POSITION first-occurrence index: slotIndices(node)[i] indexes slotNames(node),
// so slot i of the string is labelled slotNames[slotIndices[i]]. This is the
// catalog's `identifiers` array — display scaffolding, never hashed.
export function slotIndices(node) {
  const names = slotNames(node);
  return (node.expressions || []).map((e) => names.indexOf(e.name));
}

// Inverse of canonicalText: split canonical text back into its literal runs and
// count its slots, so patched text can be written back onto a node.
export function parseCanonical(text) {
  const texts = [];
  let cur = "";
  let slots = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "\\" && i + 1 < text.length) { cur += text[i + 1]; i++; continue; }
    if (c === "$" && text[i + 1] === "{" && text[i + 2] === "}") {
      texts.push(cur); cur = ""; slots++; i += 2; continue;
    }
    cur += c;
  }
  texts.push(cur);
  return { texts, slots };
}

// ---------------------------------------------------------------------------
// Patching — mutate the node in place, never the source text
// ---------------------------------------------------------------------------
// The node's OWN interpolation expressions are reused, in their original order —
// the new text supplies only the literal runs between them. So an edit can never
// rename, reorder, drop, or invent a variable: the i-th `${}` in the patched text
// binds to the i-th expression the stock node already had. An edit that changed
// the number of slots has no valid binding and throws, so the caller can report a
// LOST un-nerf rather than emit a corrupted string.
export function setNodeText(node, text) {
  const { texts, slots } = parseCanonical(text);
  if (node.type === "StringLiteral") {
    if (slots) throw new Error(`cannot write ${slots} slot(s) into a quoted literal`);
    node.value = texts[0];
    // The generator prints extra.raw verbatim, but only when rawValue still
    // agrees with value — so both must be rewritten together.
    node.extra = { raw: encodeQuoted(texts[0]), rawValue: texts[0] };
    return node;
  }
  const exprs = node.expressions || [];
  if (slots !== exprs.length) {
    throw new Error(
      `patched text has ${slots} slot(s) but the string has ${exprs.length} — ` +
      `every \${…} placeholder must be kept, in the same order`
    );
  }
  const built = makeTemplate(texts, exprs.slice());
  node.quasis = built.quasis;
  node.expressions = built.expressions;
  // Drop any cached source spelling so the generator emits from our quasis.
  delete node.extra;
  delete node.start;
  delete node.end;
  delete node.loc;
  delete node.range;
  return node;
}

// ---------------------------------------------------------------------------
// Positions where a backtick is a syntax error
// ---------------------------------------------------------------------------
// Measured on the 2.1.219 bundle: 6,943 ObjectProperty keys and 1 ClassMethod key.
// The rest are module specifiers and TS/JSX type positions, which never carry
// prompt text. Anything missed here is caught by the reparse gate in the caller,
// which refuses to emit a bundle that does not parse cleanly.
function backtickIllegal(parentType, key, parent) {
  switch (parentType) {
    case "ObjectProperty":
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ClassProperty":
    case "ClassPrivateProperty":
    case "ClassAccessorProperty":
    case "TSPropertySignature":
    case "TSMethodSignature":
    case "TSDeclareMethod":
      return key === "key" && !parent.computed;
    case "ImportDeclaration":
    case "ExportNamedDeclaration":
    case "ExportAllDeclaration":
    case "TSImportType":
    case "TSExternalModuleReference":
      return key === "source" || key === "argument" || key === "expression";
    case "ImportAttribute":
      return key === "value";
    case "JSXAttribute":
      return key === "value";
    case "TSLiteralType":
    case "TSEnumMember":
      return true;
    case "TaggedTemplateExpression":
      // The tag function receives the raw/cooked arrays verbatim (String.raw and
      // friends), so rewriting a tagged quasi changes what the tag observes.
      return true;
    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// `+` chain flattening and folding
// ---------------------------------------------------------------------------
const isConcat = (n) => n && n.type === "BinaryExpression" && n.operator === "+";

function flattenConcat(node, out = []) {
  if (isConcat(node)) { flattenConcat(node.left, out); flattenConcat(node.right, out); }
  else out.push(node);
  return out;
}

const rebuildConcat = (ops) => ops.reduce((left, right) => ({ type: "BinaryExpression", operator: "+", left, right }));

// Fold a flattened operand list into the fewest possible nodes.
//
// The one subtlety: a bare Identifier may only be absorbed as a slot once a
// string is ESTABLISHED TO ITS LEFT in the same chain. Absorbing eagerly would
// turn `1 + 2 + "a"` into `` `12a` `` — but `+` adds those numbers first, giving
// "3a". Requiring an established string keeps the coercion identical.
function fold(ops, stats) {
  const out = [];
  let texts = null; // accumulating literal runs
  let exprs = null;
  const flush = () => {
    if (texts) out.push(makeTemplate(texts, exprs));
    texts = exprs = null;
  };
  for (const op of ops) {
    if (isSimpleTemplate(op)) {
      // Adjacent literal text joins onto the accumulator's tail run.
      const parts = op.quasis.map(cookedOf);
      if (!texts) { texts = parts.slice(); exprs = op.expressions.slice(); }
      else {
        texts[texts.length - 1] += parts[0];
        for (let i = 1; i < parts.length; i++) texts.push(parts[i]);
        exprs.push(...op.expressions);
      }
      continue;
    }
    // Absorbing a bare variable is the ONE rule that is not exactly
    // semantics-preserving: `"x"+y` coerces y with ToPrimitive(default) whereas
    // `` `x${y}` `` uses ToString, and those differ for an object carrying both a
    // meaningful valueOf and toString. Collapsing the two spellings into one
    // identity requires picking one coercion, so this is inherent rather than a
    // bug — it is counted so the exposure stays visible.
    if (op.type === "Identifier" && texts) {
      exprs.push(op); texts.push("");
      if (stats) stats.identsAbsorbed++;
      continue;
    }
    flush();
    out.push(op);
  }
  flush();
  return out;
}

// ---------------------------------------------------------------------------
// The normalizer proper
// ---------------------------------------------------------------------------
const SKIP_KEYS = new Set(["loc", "start", "end", "range", "extra", "leadingComments", "trailingComments", "innerComments", "comments", "tokens", "errors"]);

export function normalizeProgram(ast) {
  const stats = { quotedToTemplate: 0, quotedKept: 0, chainsFolded: 0, hoisted: 0, nestedFolded: 0, identsEscaped: 0, identsAbsorbed: 0, absorbedWithText: 0 };

  // Bottom-up: children are already in normal form when a parent is folded.
  const walk = (node, parent, key) => {
    if (!node || typeof node !== "object") return node;
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) node[i] = walk(node[i], parent, key);
      return node;
    }
    if (typeof node.type !== "string") return node;

    for (const k in node) {
      if (SKIP_KEYS.has(k)) continue;
      const child = node[k];
      if (child && typeof child === "object") node[k] = walk(child, node, k);
    }

    if (node.type === "Identifier" && HAS_NON_ASCII.test(node.name)) {
      node.name = escapeIdentName(node.name);
      stats.identsEscaped++;
    }

    const illegal = parent ? backtickIllegal(parent.type, key, parent) : false;

    if (node.type === "StringLiteral") {
      if (illegal) { stats.quotedKept++; return node; }
      stats.quotedToTemplate++;
      return makeTemplate([node.value], []);
    }

    if (node.type === "TemplateLiteral" && !illegal) {
      // Already an OPAQUE wrapper from a previous pass — rebuilding it would
      // reproduce itself, so stop here and keep the second pass a true no-op.
      if (isOpaqueTemplate(node) && node.quasis.length === 2 && node.quasis.every((q) => cookedOf(q) === "")) return node;
      // Hoist any interpolation that is not a bare variable reference. Each one
      // becomes its own OPAQUE template inside a `+` chain, which fold() will
      // not re-absorb — that is what makes this converge.
      if (node.expressions.length && !node.expressions.every(isSimpleSlot)) {
        const ops = [];
        let texts = [cookedOf(node.quasis[0])];
        let exprs = [];
        for (let i = 0; i < node.expressions.length; i++) {
          const e = node.expressions[i];
          const nextText = cookedOf(node.quasis[i + 1]);
          if (isSimpleSlot(e)) { exprs.push(e); texts.push(nextText); continue; }
          // A nested SIMPLE template contributes exactly its own text and slots:
          // `${`a${x}b`}` is identical to `a${x}b`, and a constant `${"lit"}` is
          // just the slotless case. Splice it inline instead of hoisting —
          // hoisting a constant splits one prompt into separate runs for no
          // semantic reason, which strands any un-nerf rule anchored across the
          // seam. Keeps texts.length === exprs.length + 1 throughout.
          if (isSimpleTemplate(e)) {
            const parts = e.quasis.map(cookedOf);
            texts[texts.length - 1] += parts[0];
            for (let j = 1; j < parts.length; j++) texts.push(parts[j]);
            exprs.push(...e.expressions);
            texts[texts.length - 1] += nextText;
            stats.nestedFolded++;
            continue;
          }
          ops.push(makeTemplate(texts, exprs));
          ops.push(makeTemplate(["", ""], [e]));
          stats.hoisted++;
          texts = [nextText];
          exprs = [];
        }
        ops.push(makeTemplate(texts, exprs));
        const folded = fold(ops.filter((o) => !(isSimpleTemplate(o) && o.expressions.length === 0 && cookedOf(o.quasis[0]) === "")), stats);
        return folded.length === 1 ? folded[0] : rebuildConcat(folded);
      }
      return node;
    }

    if (isConcat(node) && !illegal) {
      const ops = flattenConcat(node);
      // Only touch a chain that actually builds a string; `a + b` on numbers
      // must be left exactly as it is.
      if (!ops.some(isTemplate)) return node;
      const before = stats.identsAbsorbed;
      const folded = fold(ops, stats);
      if (folded.length < ops.length) stats.chainsFolded++;
      // How many absorbs land in a chain with enough literal text to be a prompt?
      if (stats.identsAbsorbed > before) {
        const chars = folded.filter(isSimpleTemplate).reduce((a, o) => a + o.quasis.reduce((b, q) => b + cookedOf(q).length, 0), 0);
        if (chars >= 24) stats.absorbedWithText++;
      }
      return folded.length === 1 ? folded[0] : rebuildConcat(folded);
    }

    return node;
  };

  walk(ast.program ?? ast, null, null);
  return stats;
}

// ---------------------------------------------------------------------------
// De-normalization — restore quoted spelling on the way OUT
// ---------------------------------------------------------------------------
// The normal form is an IN-MEMORY device: it exists so hashing and patching see
// one shape. The emitted bundle does not have to keep it, and it must not, because
// downstream source-level tooling still reads the bundle as text. lib/apply-code-
// patches.mjs anchors its effort un-nerfs on string-literal contracts spelled with
// quotes (`default_effort:"high"`, the `["low",…,"xhigh"]` enum, the
// `x==="max"&&!f(y))x="high"` resolver guard); against a fully normalized bundle
// all five anchors miss and the effort un-nerfs silently vanish — measured, and
// exactly the silent degradation the charter forbids.
//
// So every slotless template goes back to a double-quoted literal right before
// generation. Slotted templates stay templates (they have no quoted spelling), and
// a tagged template's quasi is never touched (the tag reads raw/cooked verbatim).
// This is not a partial un-normalization of identity: re-parsing the output and
// re-normalizing lands on the same normal form and the same hashes, because
// quoted -> template is exactly what normalizeProgram does on the way in.
export function denormalizeProgram(ast) {
  let n = 0;
  const walk = (node, parent, key) => {
    if (!node || typeof node !== "object") return node;
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) node[i] = walk(node[i], parent, key);
      return node;
    }
    if (typeof node.type !== "string") return node;
    for (const k in node) {
      if (SKIP_KEYS.has(k)) continue;
      const child = node[k];
      if (child && typeof child === "object") node[k] = walk(child, node, k);
    }
    if (
      isTemplate(node) &&
      node.expressions.length === 0 &&
      !(parent && parent.type === "TaggedTemplateExpression")
    ) {
      const value = cookedOf(node.quasis[0]);
      n++;
      return { type: "StringLiteral", value, extra: { raw: encodeQuoted(value), rawValue: value } };
    }
    return node;
  };
  walk(ast.program ?? ast, null, null);
  return n;
}

// ---------------------------------------------------------------------------
// Identifier escaping (see the ASCII note at the top)
// ---------------------------------------------------------------------------
export function escapeIdentName(name) {
  return [...name]
    .map((ch) => {
      const cp = ch.codePointAt(0);
      if (cp <= 0x7f) return ch;
      return cp > 0xffff ? `\\u{${cp.toString(16)}}` : "\\u" + cp.toString(16).padStart(4, "0");
    })
    .join("");
}

// ---------------------------------------------------------------------------
// Collect the hashable nodes
// ---------------------------------------------------------------------------
// Returns one entry per string-producing node in the normalized tree: every SIMPLE
// template (kind "template") plus every quoted literal normalization had to leave
// alone (kind "quoted" — object keys and module specifiers, where a backtick is a
// syntax error). Several nodes can share a canonical text (the same message
// emitted twice); the caller groups them by hash so a patch updates every site.
//
// A "quoted" site is included for RECALL — it must still be hashable, classifiable
// and carry-forward-able — but it is NOT patchable: on the 2.1.219 bundle all 6,944
// of them are property keys, and rewriting one would rename the property rather
// than edit a message. Callers that write must check `kind`.
export function collectStringNodes(ast) {
  const found = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) { for (const c of node) walk(c); return; }
    if (typeof node.type !== "string") return;
    if (node.type === "StringLiteral") {
      found.push({ node, kind: "quoted", text: canonicalText(node), names: [], slots: [] });
      return; // a quoted literal has no string-producing children
    }
    if (isSimpleTemplate(node)) {
      found.push({ node, kind: "template", text: canonicalText(node), names: slotNames(node), slots: slotIndices(node) });
    }
    for (const k in node) {
      if (SKIP_KEYS.has(k)) continue;
      const child = node[k];
      if (child && typeof child === "object") walk(child);
    }
  };
  walk(ast.program ?? ast);
  return found;
}
