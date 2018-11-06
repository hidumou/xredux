import { combineReducers } from 'redux';
import createStore from './createStore';
import reducerHelper from './reducer';
import actionHelper from './action';
import constants from '../constants';
import { prefixNamespace, isArray, isPlainObject } from '../utils';

const { SET_STATE } = constants;

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
  const {
    namespace, initialState, reducers, effects,
  } = model;
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
    initialState,
    reducers: filterReducers(reducers),
    effects: filterReducers(effects),
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
  createStore(reducers, initialState, externalMiddlewares) {
    if (externalMiddlewares && !isArray(externalMiddlewares)) {
      throw new Error(`Expected the middlewares to be a array, but got ${typeof externalMiddlewares}`);
    }
    // create store
    const store = createStore.call(
      this,
      reducers ? combineReducers(reducers) : undefined,
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
    // init memory models
    if (this.MEMORY_MODELS.length > 0) {
      this.addModels(this.MEMORY_MODELS);
      this.MEMORY_MODELS = [];
    }
    return store;
  }
  addModels(models) {
    if (models && !isArray(models)) {
      throw new Error(`Expected the models to be a array, but got ${typeof models}`);
    }
    for (let i = 0; i < models.length; i += 1) {
      const m = models[i];
      const model = validateModel(m, this.models);
      const { namespace } = model;

      if (model.reducers && Object.keys(model.reducers).indexOf(SET_STATE) === -1) {
        // inject setState reducer to reducers
        // it can help to set state quickly in the effects
        model.reducers[SET_STATE] = (state, action) => ({
          ...state,
          ...action.payload,
        });
      }

      // prefix namespace to reducers and effects
      const reducers = prefixNamespace(namespace, model.reducers);
      const effects = prefixNamespace(namespace, model.effects);

      // inject reducer
      const finalReducer = getReducer(reducers, model.initialState);
      this.reducers[namespace] = finalReducer;

      // add effects
      this.effects = {
        ...this.effects,
        ...effects,
      };

      // add actions
      const actions = actionHelper.add(model, this.store.dispatch);
      this.actions[namespace] = {
        ...this.actions,
        ...actions,
      };

      // save model
      this.models.push(model);
    }
    // update reducer in the store
    this.store.replaceReducer(createReducer(this.reducers));
  }
  model(m) {
    if (!this.store) {
      this.MEMORY_MODELS.push(m);
      return;
    }
    this.addModels([m]);
  }
}
