# XRedux
[![npm version](https://img.shields.io/npm/v/xredux.svg?colorB=007ec6&style=flat-square)](https://www.npmjs.com/package/xredux)
[![build status](https://img.shields.io/travis/beyondxgb/xredux.svg?style=flat-square)](https://travis-ci.org/beyondxgb/xredux)
![coverage status](https://img.shields.io/coveralls/beyondxgb/xredux.svg?style=flat-square)
[![npm downloads](https://img.shields.io/npm/dm/xredux.svg?style=flat-square)](https://www.npmjs.com/package/xredux)
[![license](https://img.shields.io/github/license/beyondxgb/xredux.svg?style=flat-square)](https://github.com/beyondxgb/xredux/blob/master/LICENSE)

An upgrade for redux. Inspired by [dva](https://github.com/dvajs/dva) and [mirrorx](https://github.com/mirrorjs/mirror).

XRedux is not a framework like `dva` and `mirrorx`. It's just a plain libray and it solves the two problems that redux brought about.
  
  1. Following redux rules, we need create actions、reducers even more files. This will lead to mental leap.
  2. Redux didn't solve the async action.

So We need a higher abstraction. There are already better solutions to these two problems. Such as `dva` propose model concept to solve the problems which we should create many files. For the async action problem, dva use [saga](https://github.com/redux-saga/redux-saga) and `mirrorx` use [redux-thunk](https://github.com/reduxjs/redux-thunk). I think `redux-thunk` is better which we can use async/await to write code. So XRedux is a libray combining the two ideas. It's just a plain libray the same as `redux`. It can be used in any framework.


## Installation
```bash
npm install --save xredux
```

## Usage

```js
import xredux from "xredux";

// Create a Redux store holding the state of your app.
// Its API is the same as redux store, { subscribe, dispatch, getState }
const store = xredux.createStore();

// xredux.actions contain all actions in the store.
const actions = xredux.actions;

// This is a model, a pure object with namespace, initialState, reducers, effects.
xredux.model({
  namespace: "counter",
  initialState: {
    count: 0
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        count: state.count + 1
      };
    },
    plus(state, action) {
      return {
        ...state,
        count: state.count - 1
      };
    }
  },
  effects: {
    async addAsync(action, dispatch, getState) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      // Dispatch action with xredux.actions
      actions.counter.add();

      // You can aslo use `dispatch` action
      // dispatch({ type: "counter/add" });

      // You even can use built-in `setState` reducer
      // const { count } = getState().counter;
      // actions.counter.setState({ count: count + 1 });
    }
  }
});

store.subscribe(() => console.log(store.getState()));

// Dispatch action with xredux.actions
// xredux.actions contain all action in the store
// xredux.actions = { [namespace]: { ...reducers } }
actions.counter.add(); // store.getState() => { counter: { count: 1 } }

actions.counter.plus(); // store.getState() => { counter: { count: 0 } }

// Dispatch async action
actions.counter.addAsync(); // store.getState() => { counter: { count: 1 } }

// You can aslo use `dispatch` action
// dispatch({ type: [namespace]/[reducer] })
store.dispatch({ type: "counter/add" }); // store.getState() => { counter: { count: 2 } }
store.dispatch({ type: "counter/addAsync" }); // store.getState() => { counter: { count: 3 } }
```

## Documentation
* [Introduction](https://github.com/beyondxgb/xredux/blob/master/docs/introduction.md)
* [Async Action](https://github.com/beyondxgb/xredux/blob/master/docs/async.md)
* [API Reference](https://github.com/beyondxgb/xredux/blob/master/docs/api.md)
* [FAQ](https://github.com/beyondxgb/xredux/blob/master/docs/FAQ.md)


## Examples
* [Plain](https://codesandbox.io/s/8pl0n4lzl8)
* [Counter](https://codesandbox.io/s/n500m9qzjj)
* [Todo](https://codesandbox.io/s/mo680580px)
* [Standard](https://github.com/risjs/create-ris/tree/master/template/standard)

## License

MIT
