/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function cleanup(doc) {
  const wrapChars = ['', '""', "''", '<>'];

  // Match links to safelinks.protection.outlook.com and change them.
  for (let link of doc.querySelectorAll('a[href*="safelinks.protection.outlook.com"]')) {
    const trackURL = link.href;
    try {
      const cleanURL = new URL(trackURL).searchParams.get("url");
      link.href = new URL(cleanURL).toString();
    } catch (error) {
      // Could be just mentioning the safelinks service and not really a tracked link
      console.warn(`Failed getting clean URL for "${trackURL}": ${error.message}`)
      continue;
    }

    // Identify which pattern wraps the link text
    const wrap = 1 + wrapChars.slice(1).indexOf([
      link.textContent.slice(0, 1),
      link.textContent.slice(-1),
    ].join(''));

    // Replace link text if it matches the tracked link
    if (trackURL == link.textContent.slice(!!wrap, link.textContent.length - !!wrap)) {
      link.textContent = [
        wrapChars[wrap].slice(0, 1),
        link.href,
        wrapChars[wrap].slice(1),
      ].join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  messenger.messageDisplayScripts.register({
    js: [{ code: `(${cleanup.toString()})(document);` }],
  });

  messenger.composeScripts.register({
    js: [{ code: `(${cleanup.toString()})(document);` }],
  });
});


