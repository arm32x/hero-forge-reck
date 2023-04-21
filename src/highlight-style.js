// A Material Dark highlight style for CodeMirror 6.
// Copied and modified slightly from https://github.com/craftzdog/cm6-themes/blob/e696f1241d42e2823388f9759ece4f1f149a7c90/packages/material-dark/src/index.ts

import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const base00 = "#2e3235",
  base01 = "#505d64",
  base02 = "#606f7a",
  base03 = "#707d8b",
  base04 = "#a0a4ae",
  base05 = "#bdbdbd",
  base06 = "#e0e0e0",
  base07 = "#fdf6e3",
  base_red = "#ff5f52",
  base_deeporange = "#ff6e40",
  base_pink = "#fa5788",
  base_yellow = "#facf4e",
  base_orange = "#ffad42",
  base_cyan = "#56c8d8",
  base_indigo = "#7186f0",
  base_purple = "#cf6edf",
  base_green = "#6abf69",
  base_lightgreen = "#99d066",
  base_teal = "#4ebaaa";

const invalid = base_red,
  darkBackground = "#202325",
  highlightBackground = "#545b61",
  background = base00,
  tooltipBackground = base01,
  selection = base01,
  cursor = base04;

/// The highlighting style for code in the Material Dark theme.
export default HighlightStyle.define([
  { tag: t.keyword, color: base_purple },
  {
    tag: [t.name, t.deleted, t.character, t.macroName],
    color: base_cyan,
  },
  { tag: [t.propertyName], color: base_yellow },
  { tag: [t.variableName], color: base05 },
  { tag: [t.function(t.variableName)], color: base_cyan },
  { tag: [t.labelName], color: base_purple },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_yellow,
  },
  { tag: [t.definition(t.name), t.separator], color: base_pink },
  { tag: [t.brace], color: base_purple },
  {
    tag: [t.annotation],
    color: invalid,
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: base_orange,
  },
  {
    tag: [t.typeName, t.className],
    color: base_orange,
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: base_indigo,
  },
  {
    tag: [t.tagName],
    color: base_deeporange,
  },
  {
    tag: [t.squareBracket],
    color: base_red,
  },
  {
    tag: [t.angleBracket],
    color: base02,
  },
  {
    tag: [t.attributeName],
    color: base05,
  },
  {
    tag: [t.regexp],
    color: invalid,
  },
  {
    tag: [t.quote],
    color: base_green,
  },
  { tag: [t.string], color: base_lightgreen },
  {
    tag: t.link,
    color: base_cyan,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: base_yellow,
  },
  { tag: [t.meta], color: base03 },
  { tag: [t.comment], color: base03, fontStyle: "italic" },
  { tag: t.monospace, color: base05 },
  { tag: t.strong, fontWeight: "bold", color: base_red },
  { tag: t.emphasis, fontStyle: "italic", color: base_lightgreen },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.heading, fontWeight: "bold", color: base_yellow },
  { tag: t.heading1, fontWeight: "bold", color: base_yellow },
  {
    tag: [t.heading2, t.heading3, t.heading4],
    fontWeight: "bold",
    color: base_yellow,
  },
  {
    tag: [t.heading5, t.heading6],
    color: base_yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_cyan },
  {
    tag: [t.processingInstruction, t.inserted],
    color: base_red,
  },
  {
    tag: [t.contentSeparator],
    color: base_cyan,
  },
  { tag: t.invalid, color: base02, borderBottom: `1px dotted ${base_red}` },
]);
