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
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: '',
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
      'react-redux',
      'redux',
      'redux-form',
      'redux-saga',
      'redux-devtools-extension',
      'webpack',
    ], { silent: true });

    if (this.answers.devDependencies) {
      await this.yarnInstall([
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-airbnb-base',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'webpack-dashboard',
      ], { dev: true, silent: true });
    }
  }

  async writing() {
    this.log(chalk.green('Writing template files...'));

    const name = this.answers.name.trim().toLowerCase().replace(' ', '-');
    const description = this.answers.description;

    await this.fs.copyTpl(
      this.templatePath('npm/package.json'),
      this.destinationPath('package.json'),
      {
        name,
        description,
      },
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
    );

    this.fs.copy(
      this.templatePath('app'),
      this.destinationPath('app'),
    );
  }
};
