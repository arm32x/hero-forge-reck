import { EditorView } from "codemirror";

export default EditorView.theme(
  {
    "&": {
      fontSize: "14px",
      lineHeight: "1.4em",
    },
    "&, .cm-panels": {
      color: "var(--ReCK-foreground-color)",
      backgroundColor: "var(--ReCK-background-color)",
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "1px solid var(--ReCK-divider-color)",
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "1px solid var(--ReCK-divider-color)",
    },

    ".cm-gutters": {
      backgroundColor: "var(--ReCK-background-color)",
      color: "var(--ReCK-secondary-color)",
    },

    ".cm-activeLine": {
      backgroundColor: "var(--ReCK-hover-color)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "var(--ReCK-hover-color)",
    },

    "&.cm-focused": {
      outline: "1px solid var(--ReCK-focus-color-opaque)",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: "var(--ReCK-selection-color)",
      },
    ".cm-selectionMatch": {
      backgroundColor: "var(--ReCK-editor-selection-match-color)",
    },

    ".cm-content": {
      caretColor: "var(--ReCK-foreground-color)",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "var(--ReCK-foreground-color)",
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "var(--ReCK-secondary-color)",
    },

    ".cm-tooltip": {
      border: "none",
      backgroundColor: "var(--ReCK-background-color)",
      borderRadius: "2px",
      boxShadow: "var(--ReCK-editor-tooltip-shadow)",
      overflow: "hidden",
    },
    ".cm-tooltip .cm-tooltip-arrow::before, .cm-tooltip .cm-tooltip-arrow::after":
      {
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      },

    // Colors from the Material Dark theme (used for syntax highlighting).
    ".cm-diagnostic-error": {
      borderLeftColor: "#ff5f52",
    },
    ".cm-diagnostic-warning": {
      borderLeftColor: "#ffad42",
    },
    ".cm-lintPoint::after": {
      bottom: "7px",
    },
    ".cm-lintPoint-error::after": {
      borderBottomColor: "#ff5f52",
    },
    ".cm-lintPoint-warning::after": {
      borderBottomColor: "#ffad42",
    },

    // Work around weird line height on empty document.
    ".cm-line": {
      minHeight: "1.4em",
    },
  },
  { dark: true }
);
