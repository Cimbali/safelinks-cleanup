/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
(function () {
  let parser = new DOMParser();
  let doc = parser.parseFromString(document.documentElement.outerHTML, "text/html");

  // Match links to safelinks.protection.outlook.com and change them.
  for (let link of doc.querySelectorAll(`a[href*="safelinks.protection.outlook.com"]`)) {
    let safeURL = link.href;
    let real = safeToOriginal(safeURL);
    link.href = real;
    if (link.textContent == safeURL) {
      link.textContent = real;
      link.classList.add("safelink-offr");
    }
  }
  document.body.innerHTML = doc.body.innerHTML;
})();

