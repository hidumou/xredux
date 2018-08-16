import XRedux from './core/xredux';

function createInstance() {
  const instance = new XRedux();
  return instance;
}

const xredux = createInstance();

xredux.create = () => createInstance();

export default xredux;
