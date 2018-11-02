import xredux from '../src/index';

it('should memory models when store is undefined', () => {
  const instance = xredux.create();
  instance.model({
    namespace: 'app',
  });
  expect(instance.MEMORY_MODELS).toBeInstanceOf(Array);
  expect(instance.MEMORY_MODELS).toHaveLength(1);
});

it('should added models when store is defined', () => {
  const instance = xredux.create();
  instance.model({
    namespace: 'app',
  });
  instance.createStore();
  expect(instance.MEMORY_MODELS).toBeInstanceOf(Array);
  expect(instance.MEMORY_MODELS).toHaveLength(0);
  expect(instance.models).toBeInstanceOf(Array);
  expect(instance.models).toHaveLength(1);
});

it('throws if model namespace is invalid', () => {
  const instance = xredux.create();
  instance.createStore();
  expect(() => {
    instance.model();
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 1,
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
    });
  }).not.toThrow();
});

it('throws if model namespace is duplicated', () => {
  const instance = xredux.create();
  instance.createStore();
  instance.model({
    namespace: 'app',
  });
  expect(() => {
    instance.model({
      namespace: 'app',
    });
  }).toThrow();
});

it('throws if model reducers is invalid', () => {
  const instance = xredux.create();
  instance.createStore();
  expect(() => {
    instance.model({
      namespace: 'app',
      reducers: 123,
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      reducers: [],
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      reducers: () => {},
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      reducers: {
      },
    });
  }).not.toThrow();
});

it('throws if model effects is invalid', () => {
  const instance = xredux.create();
  instance.createStore();
  expect(() => {
    instance.model({
      namespace: 'app',
      effects: 123,
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      effects: [],
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      effects: () => {},
    });
  }).toThrow();
  expect(() => {
    instance.model({
      namespace: 'app',
      effects: {
      },
    });
  }).not.toThrow();
});

it('throws if models is invalid', () => {
  const instance = xredux.create();
  expect(() => {
    instance.addModels();
  }).toThrow();
  expect(() => {
    instance.addModels({});
  }).toThrow();
  expect(() => {
    instance.addModels(() => {});
  }).toThrow();
});

it('should add reducers', () => {
  const instance = xredux.create();
  instance.createStore();
  instance.model({
    namespace: 'app',
    reducers: {
      add() {
      },
    },
  });
  expect(instance.actions.app.add).toBeInstanceOf(Function);
});

it('should not add actions if reducers is invalid ', () => {
  const instance = xredux.create();
  instance.createStore();
  instance.model({
    namespace: 'app',
    reducers: {
      add: {
        count: 1,
      },
    },
  });
  expect(instance.actions.app.add).toBe(undefined);
});

it('should add effects', () => {
  const instance = xredux.create();
  instance.createStore();
  instance.model({
    namespace: 'app',
    effects: {
      async add() {
        await 1;
      },
    },
  });
  expect(instance.actions.app.add).toBeInstanceOf(Function);
});

it('should not add actions if effects is invalid', () => {
  const instance = xredux.create();
  instance.createStore();
  instance.model({
    namespace: 'app',
    effects: {
      add: {
        count: 1,
      },
    },
  });
  expect(instance.actions.app.add).toBe(undefined);
});

it('should not add actions if action name is duplicated', () => {
  const instance = xredux.create();
  instance.createStore();
  expect(() => {
    instance.model({
      namespace: 'app',
      reducers: {
        add() {
        },
      },
      effects: {
        add() {
        },
      },
    });
  }).toThrow();
});
