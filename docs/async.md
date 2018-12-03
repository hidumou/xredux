# Async action

There were so many times we should do some async action in our reducer. But redux don't solve async action problem internally. It provide a method that use middleware to solve this problem. We know that it is [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

`redux-thunk` make the action not return a plain object but return a function. So that we can do some async operation and dispatch a sync action finally.

```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

With `redux-thunk`, the action is not pure. And do async operation in the action definition is not a better way.

In the `xredux`, we make the async action in the `effects`. So we can handle it correctly.

```
import xredux from 'xredux';

const actions = xredux.actions;

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
xredux.model({
  namesapce: 'counter',
  initialState: 0,
  reducers: {
    add(state, action) {
      return state + 1;
    }
  },
  effects: {
    async addAsync() {
      await sleep(1000);
      actions.counter.add();
    },
  },
});
```

In fact, we use a way similar to `redux-thunk` to deal with the actions we define in the efects.

In the `xredux`, we add a middleware to solve this problem.

```js
function createEffectMiddleware(context) {
  return ({ dispatch, getState }) => next => (action) => {
    const { effects } = context;
    if (typeof effects[action.type] === 'function') {
      return effects[action.type](action, dispatch, getState);
    }
    return next(action);
  };
}
export default createEffectMiddleware;
```

Now, we solve the async action in a better way. But sometimes we will come across other problem.

For example, we fetch data from remote server:

```js
import xredux from 'xredux';
import { fetchUserInfo } from 'services/api';

const { actions } = xredux;

xredux.model({
  namespace: 'user',
  initialState: {
    getUserInfoStart: false,
    getUserInfoError: null,
    userInfo: null,
  },
  reducers: {
    // fetch start
    getUserInfoStart (state, action) {
      return {
        ...state,
        getUserInfoStart: true,
      };
    },
    // fetch error
    getUserInfoError (state, action) {
      return {
        ...state,
        getUserInfoStart: false,
        getUserInfoError: action.payload,
      };
    },
    // fetch success
    setUserInfo (state, action) {
      return {
        ...state,
        userInfo: action.payload,
        getUserInfoStart: false,
      };
    }
  },
  effects: {
    async getUserInfo (action, dispatch, getState) {
      let userInfo = null;
      actions.user.getUserInfoStart();
      try {
        userInfo = await fetchUserInfo();
        actions.user.setUserInfo(userInfo);
      } catch (e) {
        actions.user.setUserInfoError(e);
      }
    }
  },
});
```

We see that fetch data have three status, `fetch start`, `fetch success` and `fetch error`. So we need define three actions when we fetch data from remote server every time. This is cumbersome and a lot of redundant code.

We aslo see that this three actions have a common feature. The actions only set state and do nothing.

For this problem, xredux make a reducer named 'setState' built in. It let us set state quickly.

So we change the code use 'setState' built in:

```js
import xredux from 'xredux';
import { fetchUserInfo } from 'services/api';

const { actions } = xredux;

xredux.model({
  namespace: 'user',
  initialState: {
    getUserInfoStart: false,
    getUserInfoError: null,
    userInfo: null,
  },
  reducers: {
  },
  effects: {
    async getUserInfo (action, dispatch, getState) {
      let userInfo = null;
      // fetch start
      actions.user.setState({
        getUserInfoStart: true,
      });
      try {
        userInfo = await fetchUserInfo();
        // fetch success
        actions.user.setState({
          getUserInfoStart: false,
          userInfo,
        });
      } catch (e) {
        // fetch error
        actions.user.setState({
          getUserInfoError: e,
        });
      }
    }
  },
});
```

We can see that the code is simple than before. The `setState` action help us set state quickly. You can use `setState` in anytime when you only want to set state and do nothing.

In xredux code, it add `setState` action as follwing:

```js
if (model.reducers && Object.keys(model.reducers).indexOf(SET_STATE) === -1) {
  // inject setState reducer to reducers
  // it can help to set state quickly in the effects
  model.reducers[SET_STATE] = (state, action) => ({
    ...state,
    ...action.payload,
  });
}
```
