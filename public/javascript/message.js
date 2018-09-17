"use strict";

import {
  getFooterStatusContent
} from "../helpers/domHelper.js";

export const statusFooter = message =>
  getFooterStatusContent.innerHTML = message;