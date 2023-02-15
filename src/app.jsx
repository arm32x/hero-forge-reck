import { indentWithTab } from "@codemirror/commands";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { syntaxHighlighting } from "@codemirror/language";
import { linter } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mountDom } from "@gera2ld/jsx-dom";
import { materialDarkHighlightStyle } from "cm6-theme-material-dark";
import { basicSetup, EditorView } from "codemirror";

import * as icons from "./icons.jsx";
import stylesheet from "./style.css";
import theme from "./theme.js";

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
      <div className="ReCK-button-panel">
        <button className="ReCK-button">
          <icons.FileOpen />
          Reload
        </button>
        <button className="ReCK-button">
          <icons.SaveAlt />
          Apply
        </button>
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
      <icons.ChevronRight />
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
