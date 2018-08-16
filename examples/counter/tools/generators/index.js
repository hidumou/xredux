/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const componentGenerator = require('./component/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
