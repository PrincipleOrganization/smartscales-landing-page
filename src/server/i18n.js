'use strict';

/**
* Module body.
**/

const KEYS = {};

/**
* Export.
**/

module.exports = (language) => {
  let values = {};

  for (let key in KEYS) {
    values[key] = KEYS[key][language];
  }

  return values;
};
