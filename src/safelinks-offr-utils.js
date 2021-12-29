/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
function safeToOriginal(url) {
  return decodeURIComponent(new URL(url).search.split("=")[1].split("&")[0]);
}

