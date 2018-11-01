const path = require('path');

const resolveApp = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
  entry: resolveApp('src/index.js'),
  module: {
    rules: []
  },
  resolve: {},
  plugins: [],
};
