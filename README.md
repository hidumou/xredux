# XRedux
An upgrade for redux. Inspired by [dva](https://github.com/dvajs/dva) and [mirrorx](https://github.com/mirrorjs/mirror).

# Why XRedux
XRedux is not a framework like dva and mirrorx. It's just a plain libray and it solves the two problems that redux brought about.
  1. Following redux rules, we need create actions、reducers even more files. This will lead to mental leap.
  2. Redux didn't solve the async action.

So We need a higher abstraction. The above problems 


# Installation
```bash
npm install --save xredux
```

# Usage

```js
import xredux from 'xredux';

// Create a Redux store holding the state of your app.
// Its API is the same as redux store, { subscribe, dispatch, getState }
const store = xredux.createStore();

// xredux.actions contain all actions in the store
const actions = xredux.actions;

/**
 * This is a model, a pure object with namespace, initialState, reducers, effects.
 * We
 */
xredux.model({
  namespace: 'app',
  initialState: {
    count: 1,
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        count: state.count + 1,
      }
    }
  },
  effects: {
    async addSync(action, dispatch, getState) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      dispatch({ type: 'app/add' });
    }
  }
});
```
