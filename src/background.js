/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Execute the startup handler whenever Thunderbird starts.
 */
document.addEventListener("DOMContentLoaded", () => {
  messenger.messageDisplayScripts.register({
    js: [{ file: "/src/safelinks-offr-utils.js" }, { file: "/src/safelinks-offr-display.js" }],
    css: [{ file: "/src/safelinks-offr.css" }],
  });

  messenger.composeScripts.register({
    js: [{ file: "/src/safelinks-offr-utils.js" }, { file: "/src/safelinks-offr-compose.js" }],
    css: [{ file: "/src/safelinks-offr.css" }],
  });
});


