const Generator = require('yeoman-generator')
const chalk = require('chalk')

const {
  rootHelper,
} = require('./helpers')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.log(chalk.green('Initializing...'))
    this.option('quiet')

    this.quiet = this.options.quiet
  }

  async prompting() {
    if (this.quiet) {
      this.answers = {
        name: 'cx-react-project',
        description: 'New React Project',
        modules: 'users',
        deployment: 'None',
        devDependencies: true,
      }
    } else {
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
        name: 'ui',
        message: 'Are you using a ui framework?',
        default: 'None',
        choices: ['None', 'material-ui'],
      },
      {
        when: response => response.ui === 'material-ui',
        name: 'includeLogin',
        message: 'Would you like to include a Material login form?',
        type: 'confirm',
        default: false,
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
      }])
    }
  }

  async install() {
    this.log(chalk.green('Installing...'))

    const dependencies = [
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
    ]

    if (this.answers.ui === 'material-ui') {
      dependencies.push('@material-ui/core')
    }

    await this.yarnInstall(dependencies, { silent: true })

    if (this.answers.devDependencies) {
      await this.yarnInstall([
        '@babel/core',
        '@babel/polyfill',
        '@babel/preset-env',
        '@babel/preset-flow',
        '@babel/preset-react',
        'babel-eslint',
        'babel-loader',
        'css-loader',
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
        'node-sass',
        'prettier',
        'sass-loader',
        'serve',
        'style-loader',
        'webpack-cli',
        'webpack-dashboard',
        'webpack-dev-server',
      ], { dev: true, silent: true })
    }
  }

  async writing() {
    this.log(chalk.green('Writing template files...'))

    const name = this.answers.name.trim().toLowerCase().replace(/ /g, '-')
    const {
      deployment, description, modules, ui,
    } = this.answers

    const modulesArray = modules.split(',').map(module => module.trim())

    const dotConfigs = [
      'dockerignore',
      'editorconfig',
      'eslintrc.js',
      'eslintignore',
      'gitignore',
    ]

    if (deployment === 'aws') {
      this.fs.copyTpl(
        this.templatePath('_config/package.aws.json'),
        this.destinationPath('package.json'),
        {
          name,
          description,
        },
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('_config/package.json'),
        this.destinationPath('package.json'),
        {
          name,
          description,
        },
      )
    }

    this.fs.copy(
      this.templatePath('_config/babel.config.js'),
      this.destinationPath('babel.config.js'),
    )

    dotConfigs.map(dotConfig => this.fs.copy(
      this.templatePath(`_config/${dotConfig}`),
      this.destinationPath(`.${dotConfig}`),
    ))

    await this.fs.copy(
      this.templatePath('_tooling'),
      this.destinationPath('tooling'),
    )

    if (deployment === 'aws') {
      this.fs.copy(
        this.templatePath('_deploy/aws/policies'),
        this.destinationPath('tooling/deploy/policies'),
      )

      this.fs.copyTpl(
        this.templatePath('_deploy/aws/setup.sh'),
        this.destinationPath('tooling/deploy/setup.sh'),
        {
          bucketName: name,
        },
      )
    }

    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('public/index.html'),
    )

    await this.fs.copy(
      this.templatePath('_app'),
      this.destinationPath('app'),
    )

    const {
      moduleReducerCombinationBlock,
      moduleReducerImportBlock,
    } = rootHelper.buildReducer(modulesArray)

    const {
      moduleSagaCombinationBlock,
      moduleSagaImportBlock,
    } = rootHelper.buildSaga(modulesArray)

    this.fs.copyTpl(
      this.templatePath('_root/_reducer.js'),
      this.destinationPath('app/modules/root/reducer.js'),
      {
        moduleReducerCombinationBlock,
        moduleReducerImportBlock,
      },
    )

    this.fs.copyTpl(
      this.templatePath('_root/_saga.js'),
      this.destinationPath('app/modules/root/saga.js'),
      {
        moduleSagaCombinationBlock,
        moduleSagaImportBlock,
      },
    )

    modulesArray.forEach((module) => {
      this.fs.copy(
        this.templatePath('_module'),
        this.destinationPath(`app/modules/${module}`),
      )
    })

    await this.fs.copy(
      this.templatePath('_app/modules/auth'),
      this.destinationPath('app/modules/auth'),
    )

    if (this.answers.includeLogin) {
      await this.fs.copy(
        this.templatePath('_components/Login'),
        this.destinationPath('app/modules/auth/components/Login'),
      )
    }
  }
}
