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
      default: 'users',
    },
    {
      type: 'list',
      name: 'deployment',
      message: 'What service are you using for deployment?',
      default: 'None',
      choices: ['None', 'aws'],
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
      'react-helmet',
      'react-hot-loader',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-form',
      'redux-saga',
      'redux-devtools-extension',
      'reselect',
      'webpack',
    ], { silent: true });

    if (this.answers.devDependencies) {
      await this.yarnInstall([
        '@babel/core',
        '@babel/polyfill',
        '@babel/preset-env',
        '@babel/preset-flow',
        '@babel/preset-react',
        'babel-eslint',
        'babel-loader',
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-airbnb-base',
        'eslint-loader',
        'eslint-plugin-flowtype',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'html-webpack-plugin',
        'prettier',
        'webpack-cli',
        'webpack-dashboard',
        'webpack-dev-server',
      ], { dev: true, silent: true });
    }
  }

  async writing() {
    this.log(chalk.green('Writing template files...'));

    const name = this.answers.name.trim().toLowerCase().replace(/ /g, '-');
    const { deployment, description, modules } = this.answers;

    const modulesArray = modules.split(',').map(module => module.trim());

    const dotConfigs = [
      'babelrc',
      'dockerignore',
      'editorconfig',
      'eslintrc.js',
      'eslintignore',
      'gitignore',
    ];

    this.fs.copyTpl(
      this.templatePath('_config/package.json'),
      this.destinationPath('package.json'),
      {
        name,
        description,
      },
    );

    dotConfigs.map(dotConfig => this.fs.copy(
      this.templatePath(`_config/${dotConfig}`),
      this.destinationPath(`.${dotConfig}`),
    ));

    await this.fs.copy(
      this.templatePath('_tooling'),
      this.destinationPath('tooling'),
    );

    if (deployment === 'aws') {
      this.fs.copy(
        this.templatePath('_deploy/aws/policies'),
        this.destinationPath('tooling/deploy/policies'),
      );

      this.fs.copyTpl(
        this.templatePath('_deploy/aws/setup.sh'),
        this.destinationPath('tooling/deploy/setup.sh'),
        {
          bucketName: name,
        },
      );
    }

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

    const {
      moduleSagaCombinationBlock,
      moduleSagaImportBlock,
    } = rootHelper.buildSaga(modulesArray);

    this.fs.copyTpl(
      this.templatePath('_root/_reducer.js'),
      this.destinationPath('app/modules/root/reducer.js'),
      {
        moduleReducerCombinationBlock,
        moduleReducerImportBlock,
      },
    );

    this.fs.copyTpl(
      this.templatePath('_root/_saga.js'),
      this.destinationPath('app/modules/root/saga.js'),
      {
        moduleSagaCombinationBlock,
        moduleSagaImportBlock,
      },
    );

    modulesArray.forEach((module) => {
      this.fs.copy(
        this.templatePath('_module'),
        this.destinationPath(`app/modules/${module}`),
      );
    });

    this.fs.copy(
      this.templatePath('_app/modules/auth'),
      this.destinationPath('app/modules/auth'),
    );
  }
};
