import xredux from '../src/index';

it('should handle dispatch reducers action', () => {
  const instance = xredux.create();
  const store = instance.createStore();
  instance.model({
    namespace: 'app',
    reducers: {
      add() {
        return { count: 1 };
      },
    },
  });
  instance.actions.app.add();
  const state = store.getState();
  expect(state.app.count).toBe(1);
});

it('should handle dispatch setState action', () => {
  const instance = xredux.create();
  const store = instance.createStore();
  instance.model({
    namespace: 'app',
    reducers: {
    },
  });
  instance.actions.app.setState({ count: 1 });
  const state = store.getState();
  expect(state.app.count).toBe(1);
});

it('should handle dispatch effects action', async () => {
  const instance = xredux.create();
  const store = instance.createStore();
  instance.model({
    namespace: 'app',
    reducers: {
      add() {
        return {
          count: 1,
        };
      },
    },
    effects: {
      async addAsync() {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        instance.actions.app.add();
      },
    },
  });
  const result = await instance.actions.app.addAsync();
  expect(result).toBe(undefined);
  const state = store.getState();
  expect(state.app.count).toBe(1);
});
