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
