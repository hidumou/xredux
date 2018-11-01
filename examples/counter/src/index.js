import React from 'react';
import ReactDOM from 'react-dom';
import xredux from 'xredux';
import { Provider } from 'react-redux';
import App from './App';

const store = xredux.createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
