import constants from '../constants';

const { SEP } = constants;

function actionCreator(namespace, actionName, dispatch) {
  return payload => (
    dispatch({
      type: `${namespace}${SEP}${actionName}`,
      payload,
    })
  );
}

export default {
  add(model, dispatch) {
    const actions = {};
    const { reducers = {}, effects = {}, namespace } = model;
    const validate = (actionName) => {
      if (actions[actionName]) {
        throw new Error(`Action name "${namespace}${SEP}${actionName}" has been duplicate defined! Please select another action name!`);
      }
    };
    Object.keys(reducers).forEach((actionName) => {
      validate(actionName);
      actions[actionName] = actionCreator(namespace, actionName, dispatch);
    });
    Object.keys(effects).forEach((actionName) => {
      validate(actionName);
      actions[actionName] = actionCreator(namespace, actionName, dispatch);
    });
    return actions;
  },
};

