"use strict";

import {
  getFieldCells,
  getHeaderInfoPlayerSymbol,
  getHeaderInfoCurrentPlayer
} from "../helpers/domHelper.js";

export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.innerHTML = `Sie spielen als ${playerSymbol}`;
};

export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.innerHTML = `Am Zug ist: ${currentPlayer}`;
};

export const setViewFooter = () => {

};

export const updateField = clickedField => {
  return getFieldCells[clickedField.fieldId].innerHTML = clickedField.symbol;
};