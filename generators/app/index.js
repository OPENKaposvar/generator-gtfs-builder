'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.green('OPEN Kaposvár GTFS Feed') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'agencyName',
        message: "Please provide the transit agency's name",
        default: "Kaposvári Tömegközlekedési Zrt."
      },
      {
        type: 'input',
        name: 'agencyId',
        message: "Please provide the transit agency's id",
        default: "KTZrt"
      },
      {
        type: 'input',
        name: 'agencyUrl',
        message: "Please provide the transit agency's website",
        default: "http://kaposbusz.hu"
      },
      {
        type: 'input',
        name: 'agencyTZ',
        message: "Please provide the timezone of operation",
        default: "Europe/Budapest"
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('_src/_headers/_shapes.txt'),
      this.destinationPath('src/headers/shapes.txt')
    );

    this.fs.copyTpl(
      this.templatePath('_src/_agency.txt'),
      this.destinationPath('src/agency.txt'),
      {
        agencyId: this.props.agencyId,
        agencyName: this.props.agencyName,
        agencyUrl: this.props.agencyUrl,
        timeZone: this.props.agencyTZ
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
