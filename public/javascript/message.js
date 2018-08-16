"use strict";

import {
  getFooterStatusContent
} from "../helpers/domHelper.js";

export const messageStatusFooter = message =>
  getFooterStatusContent.innerHTML = message;