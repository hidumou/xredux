import { combineReducers } from 'redux';

export default {
  getReducer(reducers = {}, initialState = null) {
    return (state = initialState, action) => {
      if (typeof reducers[action.type] === 'function') {
        return reducers[action.type](state, action);
      }
      return state;
    };
  },
  createReducer(injectedReducers = {}) {
    return combineReducers({
      ...injectedReducers,
    });
  },
};
