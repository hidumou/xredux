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
const store = xredux.createStore();
```

### `reducers`

An object of function that you can define global reducers such as `routeReducer`, `languageReducer`.

```js
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
* `initialState`

The initial state for the application.

```js
xredux.createStore({
  reducers: {
    route: routeReducer,
  },
  initialState: {
    location: null,
  },
});
```

* `externalMiddlewares`



### xredux.model({ namespace, initialState, reducers, effects })
This method is the core method. We use model to converge initialState, action and reducer so we can only focus to model in development. We make a deal that the action name is the reducer's function name.
* `namespace`(String)
To create a model, you should use a unique namespace to distinguish it. 
* `initialState`(Any)

* `reducers`(Object)

* `effects`(Object)

### xredux.actions

