const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the base component type:',
    default: 'React.Component',
    choices: () => ['React.Component', 'React.PureComponent', 'Stateless Function'],
  }, {
    type: 'input',
    name: 'path',
    message: 'Which directory should it be placed?',
    default: 'src/pages',
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value, answer) => {
      const pageContainers = fs.readdirSync(path.join(process.cwd(), answer.path));
      if ((/.+/).test(value)) {
        return pageContainers.indexOf(value) >= 0 ? 'A page with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: (data) => {
    // Generate index.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './page/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './page/class.js.hbs';
      }
    }

    const containerDir = path.join(process.cwd(), data.path, '{{properCase name}}');
    const resolveApp = relativePath => path.join(containerDir, relativePath);

    const actions = [{
      type: 'add',
      path: resolveApp('index.js'),
      templateFile: componentTemplate,
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('model.js'),
      templateFile: './page/model.js',
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('Loadable.js'),
      templateFile: './page/Loadable.js',
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('index.scss'),
      templateFile: './page/index.scss',
      abortOnFail: true,
    }];

    return actions;
  },
};
