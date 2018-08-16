const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Add a component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the base component type:',
    default: 'React.PureComponent',
    choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
  }, {
    type: 'input',
    name: 'path',
    message: 'Which directory should it be placed?',
    default: 'src/components',
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value, answer) => {
      let components = [];
      try {
        components = fs.readdirSync(path.join(process.cwd(), answer.path));
      } catch (e) {

      }
      if ((/.+/).test(value)) {
        return components.indexOf(value) >= 0 ? 'A component with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: (data) => {
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

    const containerDir = path.join(process.cwd(), data.path, '{{properCase name}}');
    const resolveApp = relativePath => path.join(containerDir, relativePath);
    const actions = [{
      type: 'add',
      path: resolveApp('index.js'),
      templateFile: componentTemplate,
      abortOnFail: true,
    }];

    return actions;
  },
};
