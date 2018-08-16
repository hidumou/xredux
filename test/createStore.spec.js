import xredux from '../lib/xredux';

const { createStore } = xredux;

it('throws if middlewares is not a array', () => {
  expect(() => createStore(null, null, 'test')).toThrow();

  expect(() => createStore(null, null, {})).toThrow();

  expect(() => createStore(null, null, [])).not.toThrow();
});
