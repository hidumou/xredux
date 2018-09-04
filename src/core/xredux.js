import { combineReducers } from 'redux';
import createStore from './createStore';
import reducerHelper from './reducer';
import actionHelper from './action';
import { prefixNamespace, isArray, isPlainObject } from '../utils';

const { getReducer, createReducer } = reducerHelper;

function filterReducers(reducers) {
  if (!reducers) {
    return reducers;
  }
  return Object.keys(reducers)
    .reduce((acc, action) => {
      if (typeof reducers[action] === 'function') {
        acc[action] = reducers[action];
      }
      return acc;
    }, {});
}

function validateModel(model = {}, models) {
  const { namespace, reducers, effects } = model;
  if (!namespace || typeof namespace !== 'string') {
    throw new Error(`Expected the model namespace to be a string. but got ${typeof namespace}`);
  }
  if (models.some(item => item.namespace === namespace)) {
    throw new Error(`Model "${namespace}" has been created, please select another name!`);
  }

  if (reducers !== undefined && !isPlainObject(reducers)) {
    throw new Error(`Expected the model reducers to be a plain object, but got ${typeof reducers}`);
  }

  if (effects !== undefined && !isPlainObject(effects)) {
    throw new Error(`Expected the model effects to be a plain object, but got ${typeof effects}`);
  }
  return {
    namespace,
    reducers: filterReducers(reducers),
    effects: filterReducers(effects),
    ...model,
  };
}

export default class XRedux {
  constructor() {
    this.store = null;
    this.actions = {};
    this.models = [];
    this.MEMORY_MODELS = [];
    this.reducers = {};
    this.effects = {};
    this.createStore = this.createStore.bind(this);
    this.model = this.model.bind(this);
  }
  createStore(reducers = {}, initialState = {}, externalMiddlewares) {
    if (externalMiddlewares && !isArray(externalMiddlewares)) {
      throw new Error(`Expected the middlewares to be a array, but got ${typeof externalMiddlewares}`);
    }
    // create store
    const store = createStore.call(
      this,
      combineReducers(reducers),
      initialState,
      externalMiddlewares,
    );
    // init reducer
    if (reducers) {
      this.reducers = {
        ...reducers,
      };
    }
    // save store
    this.store = store;
    // init models
    if (this.MEMORY_MODELS.length > 0) {
      for (let i = 0; i < this.MEMORY_MODELS.length; i += 1) {
        this.model(this.MEMORY_MODELS[i]);
      }
      this.MEMORY_MODELS = [];
    }
    return store;
  }
  model(m) {
    if (!this.store) {
      this.MEMORY_MODELS.push(m);
      return;
    }
    const model = validateModel(m, this.models);
    const { namespace } = model;
    const reducers = prefixNamespace(namespace, model.reducers);
    const effects = prefixNamespace(namespace, model.effects);

    // inject reducer
    const finalReducer = getReducer(reducers, model.initialState);
    this.reducers[namespace] = finalReducer;

    // update reducer in the store
    this.store.replaceReducer(createReducer(this.reducers));

    // add effects
    this.effects = {
      ...this.effects,
      ...effects,
    };

    // add actions
    const actions = actionHelper.add(model, this.store.dispatch, this.actions);
    this.actions[namespace] = {
      ...this.actions,
      ...actions,
    };

    // save model
    this.models.push(model);
  }
}
