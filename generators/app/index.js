'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.green('GTFS Feed Generator') + ' by OPEN Kaposvár!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'author',
        message: "Please tell me your name",
        store: true
      },
      {
        type: 'input',
        name: 'agencyName',
        message: "Please provide the transit agency's name",
        default: "Kaposvári Tömegközlekedési Zrt.",
        store: true
      },
      {
        type: 'input',
        name: 'agencyId',
        message: "Please provide the transit agency's id",
        default: "KTZrt",
        store: true
      },
      {
        type: 'input',
        name: 'agencyUrl',
        message: "Please provide the transit agency's website",
        default: "http://kaposbusz.hu",
        store: true
      },
      {
        type: 'input',
        name: 'agencyPhone',
        message: "Please provide the agency's phone number",
        default: "+36 (82) 411 750",
        store: true
      },
      {
        type: 'input',
        name: 'agencyLang',
        message: "Please provide the agency's primary language (ISO 2 letter language codes, pls)",
        default: "hu",
        validate: function(value) {
          return 2 === value.length
        },
        store: true
      },
      {
        type: 'input',
        name: 'agencyTZ',
        message: "Please provide the timezone of operation",
        default: "Europe/Budapest",
        store: true
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
        agencyPhone: this.props.agencyPhone,
        agencyLang: this.props.agencyLang,
        timeZone: this.props.agencyTZ
      }
    );

    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        agencyId: this.props.agencyId
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        author: this.props.author,
        agencyName: this.props.agencyName
      }
    );

    this.fs.copy(
      this.templatePath('_validator'),
      this.destinationPath('validator')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
