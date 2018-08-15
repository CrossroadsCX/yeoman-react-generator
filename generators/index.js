const Generator = require('yeoman-generator');
// const chalk = require('chalk');

module.exports = class extends Generator {
  // (constructor(args, opts) {
  //     super(args, opts);
  //   })

  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname, // Default to current folder name
    }]);
  }

  async install() {
    this.yarnInstall([
      'react',
      'redux',
    ]);
  }
};
