/**
 * store.js
 *
 * Create store with xredux
 * Reference: https://github.com/beyondxgb/xredux
 *
 */

import xredux from 'xredux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { logger } from 'redux-logger';
import './models';

export default function configureStore(initialState = {}, history) {
  // Add router middleware and logger middleware
  const middlewares = [
    routerMiddleware(history),
    logger,
  ];
  const store = xredux.createStore(
    {
      router: connectRouter(history),
    },
    initialState,
    middlewares,
  );
  return store;
}
