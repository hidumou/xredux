# API Reference
* [xredux.createStore](#xreduxcreatestorereducers-initialstate-externalmiddlewares)
  * [reducers](#reducers)
  * [initialState](#initialstate)
  * [externalMiddlewares](#externalmiddlewares)
* [xredux.model](#xreduxmodel-namespace-initialstate-reducers-effects-)
  * [namespace](#namespace)
  * [initialState](#initialstate-1)
  * [reducers](#reducers-1)
  * [effects](#effects)
* [xredux.actions](#xreduxactions)

## xredux.createStore(reducers, initialState, externalMiddlewares)
Create a store. It is similar to redux's createStore.

`reducers`, `initialState` and `externalMiddlewares` is not necessary.

```js
import xredux from 'xredux';
const store = xredux.createStore();
```

The `store` instance is the same as redux's store. So you can call such as `dispatch`, `getState` method.

```js
import xredux from 'xredux';
const store = xredux.createStore();
store.getState();
```

### `reducers`
Default: `undefined`

An object of function that you can define global reducers such as `routeReducer`, `languageReducer`. The reducer must be standard redux reducers.

```js
import xredux from 'xredux';
import { LOCATION_CHANGE } from 'react-router-redux';

// route location changes
function routeReducer(state = {} action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}
xredux.createStore({
  reducers: {
    route: routeReducer,
  },
});
```

### `initialState`
Default: `{}`

The initial state for the application.

```js
import xredux from 'xredux';

xredux.createStore({
  reducers: {
    route: routeReducer,
  },
  initialState: {
    location: null,
  },
});
```

### `externalMiddlewares`
Default: `[]`

Specifies some third party middlewares. For example, you can add the `routerMiddleware` as the following:

```js
import xredux from 'xredux';
import { routerMiddleware } from 'react-router-redux';
xredux.createStore(null, {}, [routerMiddleware]);
```

## xredux.model({ namespace, initialState, reducers, effects })

The core method in xredux. We use model to converge initialState, action and reducer so we can only focus to model in development. **We make a deal that the action name is the reducer's function name**.

### `namespace`

To create a model, you should use a unique namespace to distinguish it. So that actions and reducers is in this namespace. It must be provided and be a valid string.

For example, we define a model named 'user',

```js
xredux.model({
  namespace: 'user',
});
```

`store.getState()` will like this:

```js
{
  user: {},
}
```

### `initialState`
Default: `{}`

The initial state for the model.

For example, we define a model named 'user',

```js
import xredux from 'xredux';

xredux.model({
  namespace: 'user',
  initialState: {
    userInfo: {
      name: 'beyondxgb',
    },
  },
});
```

`store.getState()` will like this:

```js
{
  user: {
    userInfo: {
      name: 'beyondxgb',
    },
  },
}
```

### `reducers`
Default: `{}`

Specifies the model's `sync` reducers. It must be standard redux reducer.

For example, we define a model named 'user',

```js
import xredux from 'xredux';

xredux.model({
  namespace: 'user',
  initialState: {
    userInfo: {
      name: 'beyondxgb',
    }
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});
```

We define a `setUserInfo` reducer and it in the `user` namespace.

`xredux.reducers` will like this:

```js
{
  user: {
    setUserInfo: [Function]
  }
}
```
And Because **we make a deal that the action name is the reducer's function name**. So action will be created automatically.

`xredux.actions` will aslo like this:

```js
{
  user: {
    setUserInfo: [Function]
  }
}
```

So we can call `setUserInfo` action as following:

```js
xredux.actions.user.setUserInfo({ name: 'arios' });
```

It aslo can be called use `store.dispatch`:

```js
store.dispatch('user/setUserInfo', { name: 'arios' });
```

The reducer function have two arguments like redux reducer, `state` and `action`.

* `state`: The model's state.
* `action`: The action object.
  It will like this:
  ```
    { type: 'user/setUserInfo', payload: { name: 'arios' } }
  ```
  `type` define the action name. `payload` is the data that pass to the action.


### `effects`
Default: `{}`

Specifies the model's `async` reducers. It must be standard redux reducer.

We can define async function in effects to deal with some async data processing.

For example, we define a model named 'user',

```js
import xredux from 'xredux';

const actions = xredux.actions;

function getUserInfo () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'arios',
      });
    }, 1000);
  });
}
xredux.model({
  namespace: 'user',
  initialState: {
    userInfo: {
      name: 'beyondxgb',
    }
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
  effects: {
    async setUserInfoAsync(action, dispatch, getState) {
      const userInfo = await getUserInfo();
      actions.user.setUserInfo(userInfo);
    },
  },
});
```

`xredux.actions` like this:

```js
{
  user: {
    setUserInfo: [Function]
    setUserInfoAsync: [Function]
  }
}
```

So we can call `setUserInfoAsync` action as following:

```js
xredux.actions.user.setUserInfoAsync();
```

## xredux.actions

`xredux.actions` contain the whole actions in the store. The actions is created automatically when we define `reducers` and `effects`.

The name of the actions is like `**[namespace]/[action name]**`.
  * `namespace`: The model namespace. We distinguish action by namespace.
  * `action name`: The action name is the `reducers` or `effects` function name that we define.

For example, we define two models named `user` and `login`

```js
import xredux from 'xredux';

const actions = xredux.actions;

// user model
xredux.model({
  namespace: 'user',
  initialState: {
  },
  reducers: {
    setUserInfo(state, action) {
      ...
    },
  },
  effects: {
    async setUserInfoAsync(action, dispatch, getState) {
      ...
    },
  },
});
xredux.model({
  namespace: 'login',
  initialState: {
  },
  reducers: {
    setLoginInfo(state, action) {
      ...
    },
  },
  effects: {
    async getLoginInfoAsync(action, dispatch, getState) {
      ...
    },
  },
});
```
`xredux.actions` will be like this:

```js
{
  user: {
    setUserInfo: [Function],
    setUserInfoAsync: [Function],
  },
  login: {
    setLoginInfo: [Function],
    getLoginInfoAsync: [Function],
  },
}
```

So we usually recommend call actions by `xredux.actions`

```js
import xredux from 'xredux';

const actions = xredux.actions;

actions.user.setUserInfo({ name: 'beyondxgb' });
actions.login.getLoginInfoAsync();
```

But we also can call actions by `store.dispatch([action name], [payload])`,

```js
import xredux from 'xredux';

const store = xredux.createStore();
store.model({
  // user model
  ...
})；
store.dispatch('user/setUserInfo', { name: 'beyondxgb' });
```
