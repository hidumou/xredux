# Usage

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
      // dispatch action with xredux.actions
      // you can aslo use `dispatch({ type: 'counter/add' })`
      actions.counter.add();
    }
  }
});
store.subscribe(() => console.log(store.getState()));

// dispatch action with xredux.actions
// you can aslo use `dispatch({ type: 'counter/add' })`
actions.counter.add(); // store.getState() => { counter: { count: 1 } }

actions.counter.plus(); // store.getState() => { counter: { count: 0 } }

// dispatch async action
actions.counter.addASync(); // store.getState() => { counter: { count: 1 } }
```