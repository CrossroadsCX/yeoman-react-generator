const Generator = require('yeoman-generator');
const chalk = require('chalk');

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
      type: 'confirm',
      name: 'devDependencies',
      message: 'Install dev dependencies?',
      default: true,
    }]);
  }

  async install() {
    this.spawnCommandSync('npm', ['init', '-y']);

    this.yarnInstall([
      'react',
      'redux',
      'redux-form',
      'redux-saga',
      'redux-devtools-extension',
      'webpack',
    ]);

    this.log(chalk.yellow(JSON.stringify(this.answers)));

    if (this.answers.devDependencies) {
      this.yarnInstall([
        'eslint-config-airbnb',
        'eslint-config-airbnb-base',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'webpack-dashboard',
      ], { dev: true });
    }
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Index templating' },
    );
  }
};
