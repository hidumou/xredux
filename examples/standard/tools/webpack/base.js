/**
 * base.js
 *
 * Webpack base config that will be merged with dev.js and prod.js
 * Reference: https://webpack.js.org/configuration/
 *
 */

const path = require('path');

const resolveApp = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
  entry: resolveApp('src/index.js'),
  module: {
    rules: [],
  },
  resolve: {
    alias: {
      assets: resolveApp('src/assets'),
      utils: resolveApp('src/utils'),
      components: resolveApp('src/components'),
      pages: resolveApp('src/pages'),
      store: resolveApp('src/store'),
      core: resolveApp('src/core'),
      services: resolveApp('src/services'),
    },
  },
  plugins: [],
};
