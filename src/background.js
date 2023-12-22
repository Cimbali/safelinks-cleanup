/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function cleanup(doc) {
  // Parent domain of tracking links (e.g. foo.${domain}) and URL parameter we want to get
  const domain = 'safelinks.protection.outlook.com', param = 'url';

  ////// Fix HTML links

  // Match links to safelinks.protection.outlook.com and change them.
  for (let link of doc.querySelectorAll(`a[href*="${domain}"]`)) {
    const trackURL = link.href;
    try {
      // Extract and decode url= parameter
      const cleanURL = new URL(trackURL).searchParams.get(param);
      // Validate it’s a legit URL and use that as link target
      link.href = new URL(cleanURL).toString();
    } catch (error) {
      // Could be just mentioning the safelinks service and not really a tracked link
      console.warn(`Failed getting clean URL for "${trackURL}": ${error.message}`)
      continue;
    }

    // Replace link text if it matches the tracked link
    link.textContent = link.textContent.replaceAll(trackURL, link.href);
  }

  ////// Now fix plain-text emails too.

  // X-path query for all text nodes containing the incriminated domain as text
  let query = document.evaluate(
    `//text()[contains(., "${domain}")]`, document.body, null,
    XPathResult. UNORDERED_NODE_ITERATOR_TYPE, null
  );

  // Make a regexp that matches the tracked links completely - don’t attempt to parse in regexp
  const munged = new RegExp(
    `https://[a-z0-9.]*${domain.replaceAll('.', '\\.')}/[a-zA-Z0-9-._~:/?#[\\]@%!$&'()*+,;=]*`,
    'ig'
  )

  for (let node = query.iterateNext(); node !== null; node = query.iterateNext()) {
    // Same as for HTML but replace in textContent directly
    node.textContent = node.textContent.replaceAll(munged, (trackURL) => {
      try {
        const cleanURL = new URL(trackURL).searchParams.get(param);
        return new URL(cleanURL).toString();
      } catch(error) {
        console.warn(`Failed getting clean URL for text "${trackURL}": ${error.message}`)
        return trackURL;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // inject function code and call it on document object on displayed and composed messages
  messenger.messageDisplayScripts.register({
    js: [{ code: `(${cleanup.toString()})(document);` }],
  });

  messenger.composeScripts.register({
    js: [{ code: `(${cleanup.toString()})(document);` }],
  });
});
