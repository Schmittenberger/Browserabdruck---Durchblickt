try {
    importScripts(
        "browser-polyfill.js",
        "../config.js",
        "background/siteClass.js",
        "background/tabHandler.js",
        "background.js",
        "background/chrome-popup.js"
    );
  } catch (e) {
    console.error(e);
  }
