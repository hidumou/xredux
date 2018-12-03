# API Reference
* [xredux.createStore]
  * [reducers]
  * [initialState]
  * [externalMiddlewares]
* [xredux.model]
  * [namespace]
  * [initialState]
  * [reducers]
  * [effects]
* [xredux.actions]

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

An object of function that you can define global reducers such as `routeReducer`, `languageReducer`. The reducer must be standard Redux reducers.

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
import { routerMiddleware } from 'react-router-redux';
xredux.createStore(null, {}, [routerMiddleware]);
```

## xredux.model({ namespace, initialState, reducers, effects })

The core method in xredux. We use model to converge initialState, action and reducer so we can only focus to model in development. **We make a deal that the action name is the reducer's function name**.

### `namespace`

To create a model, you should use a unique namespace to distinguish it. So that actions and reducers is in this namdspace. It must be provided and be a valid string.

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
    }
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




