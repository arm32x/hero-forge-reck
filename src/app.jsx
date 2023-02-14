import { json } from "@codemirror/lang-json";
import { mountDom } from "@gera2ld/jsx-dom";
import { basicSetup, EditorView } from "codemirror";
import { materialDark } from "cm6-theme-material-dark";

import { ChevronRight } from "./icons.jsx";
import stylesheet from "./style.css";

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
  const extensions = [basicSetup, json(), materialDark];
  const codemirror = new EditorView({
    extensions,
  });

  return (
    <>
      <div className="ReCK-header">
        <h2 className="ReCK-header-title">
          <span className="ReCK-logo">ReCK</span> JSON Editor
        </h2>
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

const sidebarHandle = sidebar.getElementsByClassName("ReCK-sidebar-handle")[0];
sidebarHandle.addEventListener("click", (_) => {
  sidebar.classList.toggle("ReCK-opened");
});

document.body.insertBefore(sidebar, mountpoint);
