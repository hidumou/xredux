const xredux = require('../lib/xredux');
// import xredux from '../lib/xredux';

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

const { createStore } = xredux;

const store = createStore(state => state, {}, []);
// console.log(store);
xredux.model({
  namespace: 'index',
  initialState: {
    count: 1,
  },
  reducers: {
    add(state) {
      return {
        ...state,
        count: state.count + 1,
      };
    },
  },
  effects: {
    async fetch(action, dispatch, getState) {
      console.log('fetch action: ', action);
      await sleep();
      dispatch({ type: 'index/add' });
      console.log(getState());
      // dispatch({ type: 'index/add' });
      // console.log(getState());
    },
  },
});

console.log(store.getState());
const { actions } = xredux.actions;
console.log('actions: ', actions);
actions.index.fetch({ id: 1 });
// store.dispatch({ type: 'index/fetch'});
console.log(store.getState());
const { reducers, effects } = xredux;
console.log(reducers, effects);
