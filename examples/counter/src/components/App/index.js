/**
 *
 * App
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import xredux from 'xredux';

const { actions } = xredux;

xredux.model({
  namespace: 'app',
  initialState: {
    count: 0,
  },
  reducers: {
    add(state) {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    del(state) {
      return {
        ...state,
        count: state.count - 1,
      };
    },
  },
  effects: {
    async addAsync(action, dispatch, getState) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      // dispatch({ type: 'app/add' });
      actions.app.add();
    },
  },
});

export class App extends React.PureComponent {
  render() {
    const { add, del, addAsync } = actions.app;
    return (
      <div className="app">
        <h1>{this.props.count}</h1>
        <button onClick={() => add()}>Add</button>
        <button onClick={() => del()}>Del</button>
        <button onClick={() => addAsync()}>AddAsync</button>
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number.isRequired,
};

export default connect(({ app }) => {
  return {
    count: app.count,
  };
})(App);

