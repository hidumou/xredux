# XRedux
[![npm version](https://img.shields.io/npm/v/xredux.svg?colorB=007ec6&style=flat-square)](https://www.npmjs.com/package/xredux) [![license](https://img.shields.io/github/license/xredux/xredux.svg?style=flat-square)](https://github.com/beyondxgb/xredux/blob/master/LICENSE)
An upgrade for redux. Inspired by [dva](https://github.com/dvajs/dva) and [mirrorx](https://github.com/mirrorjs/mirror).

XRedux is not a framework like `dva` and `mirrorx`. It's just a plain libray and it solves the two problems that redux brought about.
  
  1. Following redux rules, we need create actions、reducers even more files. This will lead to mental leap.
  2. Redux didn't solve the async action.

So We need a higher abstraction. There are already better solutions to these two problems. Such as `dva` propose model concept to solve the problems which we should create many files. For the async action problem, dva use [saga](https://github.com/redux-saga/redux-saga) and `mirrorx` use [redux-thunk](https://github.com/reduxjs/redux-thunk). I think `redux-thunk` is better which we can use async/await to write code. So XRedux is a libray combining the two ideas. It's just a plain libray the same as `redux`. It can use in any framework.


## Installation
```bash
npm install --save xredux
```

## Usage

```js
import xredux from 'xredux';

// Create a Redux store holding the state of your app.
// Its API is the same as redux store, { subscribe, dispatch, getState }
const store = xredux.createStore();

// xredux.actions contain all actions in the store.
const actions = xredux.actions;

// This is a model, a pure object with namespace, initialState, reducers, effects.
xredux.model({
  namespace: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        count: state.count + 1,
      }
    },
    plus(state, action) {
      return {
        ...state,
        count: state.count - 1,
      }
    }
  },
  effects: {
    async addASync(action, dispatch, getState) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      // Dispatch action with xredux.actions
      // You can aslo use `dispatch({ type: 'counter/add' })`
      actions.counter.add();
    }
  }
});

store.subscribe(() => console.log(store.getState()));

// Dispatch action with xredux.actions
// You can aslo use `dispatch({ type: 'counter/add' })`
actions.counter.add(); // store.getState() => { counter: { count: 1 } }

actions.counter.plus(); // store.getState() => { counter: { count: 0 } }

// Dispatch async action
actions.counter.addASync(); // store.getState() => { counter: { count: 1 } }
```

## Examples
* [Counter](https://codesandbox.io/s/n500m9qzjj)
* [Todo](https://codesandbox.io/s/mo680580px)

## License

MIT
