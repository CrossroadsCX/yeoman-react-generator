const Generator = require('yeoman-generator');
const chalk = require('chalk');

const {
  rootHelper,
} = require('./helpers');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(chalk.green('Initializing...'));
  }

  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname, // Default to current folder name
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: '',
    },
    {
      type: 'input',
      name: 'modules',
      message: 'What modules do you want to start with ( comma separated )?',
      default: ['auth'],
    },
    {
      type: 'confirm',
      name: 'devDependencies',
      message: 'Install dev dependencies?',
      default: true,
    }]);
  }

  async install() {
    this.log(chalk.green('Installing...'));

    await this.yarnInstall([
      'react',
      'react-dom',
      'react-hot-loader',
      'react-redux',
      'redux',
      'redux-form',
      'redux-saga',
      'redux-devtools-extension',
      'webpack',
    ], { silent: true });

    if (this.answers.devDependencies) {
      await this.yarnInstall([
        'babel-cli',
        'babel-core',
        'babel-loader',
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-airbnb-base',
        'eslint-loader',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'html-webpack-plugin',
        'webpack-dashboard',
      ], { dev: true, silent: true });
    }
  }

  async writing() {
    this.log(chalk.green('Writing template files...'));

    const name = this.answers.name.trim().toLowerCase().replace(' ', '-');
    const { description, modules } = this.answers;
    const modulesArray = modules.split(',').map(module => module.trim());

    this.fs.copyTpl(
      this.templatePath('_config/package.json'),
      this.destinationPath('package.json'),
      {
        name,
        description,
      },
    );

    this.fs.copy(
      this.templatePath('_config/editorconfig'),
      this.destinationPath('.editorconfig'),
    );

    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('public/index.html'),
    );

    await this.fs.copy(
      this.templatePath('_app'),
      this.destinationPath('app'),
    );

    const {
      moduleReducerCombinationBlock,
      moduleReducerImportBlock,
    } = rootHelper.buildReducer(modulesArray);

    this.fs.copyTpl(
      this.templatePath('_root/_reducer.js'),
      this.destinationPath('app/modules/root/reducer.js'),
      {
        moduleReducerCombinationBlock,
        moduleReducerImportBlock,
      },
    );

    modulesArray.forEach((module) => {
      this.fs.copy(
        this.templatePath('_module'),
        this.destinationPath(`app/modules/${module}`),
      );
    });
  }
};
