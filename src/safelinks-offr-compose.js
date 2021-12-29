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
    link.setAttribute("title", "🔓 ↛ " + safeURL);

    if (link.textContent == safeURL) {
      link.textContent = real;
      link.classList.add("safelink-offr");
    }
  }

  // The regex gets confused by a <br> after the link... so fix it and undo later.
  let html = document.body.innerHTML;
  html = html.replaceAll("<br>", "\n<br>");
  html = html.replaceAll(
    /(\b)(https:\/\/.+safelinks.protection.outlook.com\S+)/gi,
    function(match, p1, p2, offset, string) {
      return p1 + safeToOriginal(p2);
    }
  );
  html = html.replaceAll("\n<br>", "<br>");
  document.body.innerHTML = html;
})();

