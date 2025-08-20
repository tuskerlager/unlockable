// declaring browser for about.html
declare const browser: any;

declare const __BUILD_DATE__: string;

document.addEventListener("DOMContentLoaded", () => {
  try {
    const manifest = (typeof chrome !== 'undefined' ? chrome.runtime.getManifest() : (typeof browser !== 'undefined' ? browser.runtime.getManifest() : undefined));
    const version = manifest?.version ?? "-";
    const versionEl = document.getElementById("about-version");
    if (versionEl) versionEl.textContent = version;

    const dateEl = document.getElementById("about-release-date");
    if (dateEl) {
      const formatter = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: '2-digit' });
      const dt = new Date(typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : Date.now());
      dateEl.textContent = formatter.format(dt);
    }
  } catch {}
});


