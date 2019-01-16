/**
 * server.js
 *
 * Webpack server config that you can change it as you like
 * Reference: https://webpack.js.org/configuration/dev-server/
 *
 */

const mock = require('@ris/mock');

module.exports = {
  port: 3000,
  compress: true,
  quiet: false,
  clientLogLevel: 'none',
  disableHostCheck: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  after: (app) => {
    // Start mock data
    mock(app);
  },
  proxy: {
    // Proxy api request to the remote server
  },
};
