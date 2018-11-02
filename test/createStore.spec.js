import xredux from '../src/index';

const { createStore } = xredux;

it('throws if middlewares is not a array', () => {
  expect(() => createStore(null, null, 'test')).toThrow();

  expect(() => createStore(null, null, {})).toThrow();

  expect(() => createStore(null, null, [])).not.toThrow();
});

it('should create a redux store', () => {
  const store = createStore();
  expect(store).toBeDefined();
  expect(store.getState).toBeInstanceOf(Function);
  expect(store.getState()).toEqual({});
});

it('should init reducers', () => {
  const store = createStore({
    count: (state = 0) => state,
  });
  expect(store.getState()).toEqual({ count: 0 });
});

it('should init initialState', () => {
  const store = createStore(null, { count: 1 });
  expect(store.getState()).toEqual({ count: 1 });
});
