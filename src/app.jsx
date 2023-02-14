import { mountDom } from "@gera2ld/jsx-dom";

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

const sidebar = mountDom(
  <div className="ReCK-sidebar">

  </div>
);
document.body.insertBefore(sidebar, mountpoint);
