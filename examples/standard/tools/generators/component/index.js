const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'React.Component',
    choices: () => ['React.Component', 'React.PureComponent', 'Stateless Function'],
  }, {
    type: 'input',
    name: 'path',
    message: 'Which directory should it be placed?',
    default: 'src/components',
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value, answer) => {
      const pageComponents = fs.readdirSync(path.join(process.cwd(), answer.path));
      if ((/.+/).test(value)) {
        return pageComponents.indexOf(value) >= 0 ? 'A component with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.js.hbs';
      }
    }

    const componentDir = path.join(process.cwd(), data.path, '{{properCase name}}');
    const resolveApp = relativePath => path.join(componentDir, relativePath);

    const actions = [{
      type: 'add',
      path: resolveApp('index.js'),
      templateFile: componentTemplate,
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('index.scss'),
      templateFile: './component/index.scss',
      abortOnFail: true,
    }];

    return actions;
  },
};
