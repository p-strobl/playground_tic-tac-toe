"use strict";

import {getFieldCells, getHeaderInfoPlayerSymbol, getHeaderInfoCurrentPlayer} from "../helpers/domHelper.js";

export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.innerText = `Sie spielen als ${playerSymbol}`;
};

export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.innerText = `Am Zug ist: ${currentPlayer}`;
};

export const setViewFooter = () => {

};

export const updateField = clickedField => {
  return getFieldCells[clickedField.fieldId].innerHTML = clickedField.symbol;
};