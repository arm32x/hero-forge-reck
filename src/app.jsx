import { indentWithTab } from "@codemirror/commands";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { syntaxHighlighting } from "@codemirror/language";
import { linter } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mountDom } from "@gera2ld/jsx-dom";
import { materialDarkHighlightStyle } from "cm6-theme-material-dark";
import { basicSetup, EditorView } from "codemirror";
import initRippleJS from "vanilla-ripplejs/lib";
import rippleJSStylesheet from "vanilla-ripplejs/ripple.css";

import * as camera from "./camera.js";
import * as icons from "./icons.jsx";
import stylesheet from "./style.css";
import theme from "./theme.js";

GM_addStyle(stylesheet);
GM_addStyle(rippleJSStylesheet);

const version = GM_info.script.version;
console.log(`ReCK for Hero Forge v${version}`);

// Some Hero Forge stuff so I don't have to type unsafeWindow everywhere.
const ck = unsafeWindow.CK;

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

  const reload = () => {
    const jsonObject = ck.UndoQueue.queue[ck.UndoQueue.currentIndex];
    const jsonString = JSON.stringify(jsonObject, null, "  ");

    codemirror.dispatch({
      changes: {
        from: 0,
        to: codemirror.state.doc.length,
        insert: jsonString,
      },
    });
  };
  const apply = () => {
    // TODO: Handle errors properly.
    const jsonString = codemirror.state.doc.toString();
    const jsonObject = JSON.parse(jsonString);

    camera.preventNextChanges(1);
    ck.tryLoadCharacter(jsonObject, "ReCK: Invalid character data", () => {
      console.log("ReCK: Applied character");
    });
  };

  return (
    <>
      <div className="ReCK-header">
        <span className="ReCK-header-title">
          <span className="ReCK-logo">ReCK </span>JSON Editor
        </span>
      </div>
      <div className="ReCK-json-codemirror">{codemirror.dom}</div>
      <div className="ReCK-button-panel">
        <button className="ReCK-button" onClick={reload}>
          <div className="rippleJS"></div>
          <icons.FileOpen />
          Reload
        </button>
        <button className="ReCK-button" onClick={apply}>
          <div className="rippleJS"></div>
          <icons.SaveAlt />
          Apply
        </button>
      </div>
    </>
  );
};

const sidebar = mountDom(
  <div className="ReCK-sidebar">
    {/* TODO: Make this keyboard-accessible. */}
    <div className="ReCK-sidebar-handle">
      <div className="rippleJS"></div>
      <icons.ChevronRight />
    </div>
    <div className="ReCK-sidebar-content">
      <JsonEditor />
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
initRippleJS(sidebar);
