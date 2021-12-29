/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
(function () {
  // Match links to safelinks.protection.outlook.com and change them.
  for (let link of document.querySelectorAll(`a[href*="safelinks.protection.outlook.com"]`)) {
    let safeURL = link.href;

    let real = safeToOriginal(safeURL);
    link.href = real;
    link.setAttribute("title", "🔓 " + safeURL + "↛ " + real);

    let linkText = link.textContent;
    if (linkText == safeURL) {
      link.textContent = real;
      link.classList.add("safelink-offr");
    } else if (linkText == `"${safeURL}"` || linkText == `'${safeURL}'` || linkText == `<${safeURL}>`) {
      link.textContent = linkText.charAt(0) + real + linkText.slice(-1);
      link.classList.add("safelink-offr");
    }
  }
})();

