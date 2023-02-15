import { json, jsonParseLinter } from "@codemirror/lang-json";
import { mountDom } from "@gera2ld/jsx-dom";
import { keymap } from "@codemirror/view";
import { basicSetup, EditorView } from "codemirror";
import { materialDarkHighlightStyle } from "cm6-theme-material-dark";

import { ChevronRight } from "./icons.jsx";
import stylesheet from "./style.css";
import { indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting } from "@codemirror/language";
import { linter, lintGutter } from "@codemirror/lint";

GM_addStyle(stylesheet);

const version = GM_info.script.version;
console.log(`ReCK for Hero Forge v${version}`);

const versionTag = mountDom(
  <span className="ReCK-version-tag">+ ReCK v{version}</span>
);

// Ensure the version tag is always there, even if React decides to remove it.
const mountpoint = document.getElementById("root");
const observer = new MutationObserver((_, observer) => {
  const header = mountpoint.getElementsByTagName("header").item(0);
  const dropdowns = header?.getElementsByTagName("nav").item(0);
  if (header && dropdowns) {
    console.log("Reinserting version tag");
    observer.disconnect();
    header.insertBefore(versionTag, dropdowns);
    observer.observe(mountpoint, { childList: true, subtree: true });
  }
});
observer.observe(mountpoint, { childList: true, subtree: true });

const JsonEditor = () => {
  const theme = EditorView.theme(
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
        backgroundColor: "var(--ReCK-editor-active-line-background-color)",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "var(--ReCK-editor-active-line-background-color)",
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

  const codemirror = new EditorView({
    extensions: [
      basicSetup,
      keymap.of(indentWithTab),
      json(),
      linter(jsonParseLinter()),
      theme,
      syntaxHighlighting(materialDarkHighlightStyle),
      EditorView.darkTheme.of(true),
    ],
  });

  return (
    <>
      <div className="ReCK-header">
        <span className="ReCK-header-title">
          <span className="ReCK-logo">ReCK </span>JSON Editor
        </span>
      </div>
      <div className="ReCK-json-codemirror">{codemirror.dom}</div>
      <div className="ReCK-json-button-panel">
        <button>Reload</button>
        <button>Apply</button>
      </div>
    </>
  );
};

const sidebar = mountDom(
  <div className="ReCK-sidebar">
    <div className="ReCK-sidebar-content">
      <JsonEditor />
    </div>
    <div className="ReCK-sidebar-handle">
      <ChevronRight />
    </div>
  </div>
);

const eventsToStopPropagationFor = ["keydown", "keyup"];
for (const event of eventsToStopPropagationFor) {
  sidebar.addEventListener(event, (e) => e.stopPropagation());
}

const sidebarHandle = sidebar.getElementsByClassName("ReCK-sidebar-handle")[0];
sidebarHandle.addEventListener("click", (_) => {
  sidebar.classList.toggle("ReCK-opened");
});

document.body.insertBefore(sidebar, mountpoint);
