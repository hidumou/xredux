/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import Layout from './components/Layout';
import routes from './routes';
import './assets/styles/common.scss';

// Configure the store
import configureStore from './store';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// Render routes from route config
function renderRoutes() {
  return (
    <Switch>
      {
        routes.map(route => (
          <Route key={route.path || ''} {...route} />
        ))
      }
    </Switch>
  );
}

// Render root dom
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        {renderRoutes()}
      </Layout>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);
