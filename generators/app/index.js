/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const validator = require('validator');

module.exports = yeoman.Base.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to ${chalk.green('GTFS Feed Generator')} by OPEN Kaposvár!`
    ));

    const prompts = [
      {
        type: 'input',
        name: 'author',
        message: 'Please tell me your name',
        validate: value => value.length > 0,
        store: true,
      },
      {
        type: 'input',
        name: 'agencyName',
        message: "Please provide the transit agency's name",
        default: 'Kaposvári Tömegközlekedési Zrt.',
        validate: value => value.length > 0,
        store: true,
      },
      {
        type: 'input',
        name: 'agencyId',
        message: "Please provide the transit agency's id",
        default: 'KTZrt',
        validate: value =>
          validator.isAlphanumeric(value) && validator.isLength(value, { min: 3 }),
        store: true,
      },
      {
        type: 'input',
        name: 'agencyUrl',
        message: "Please provide the transit agency's website",
        default: 'http://kaposbusz.hu',
        validate: value => validator.isURL(value, { protocols: ['http', 'https'] }),
        store: true,
      },
      {
        type: 'input',
        name: 'agencyPhone',
        message: "Please provide the agency's phone number",
        default: '+36 (82) 411 750',
        store: true,
      },
      {
        type: 'input',
        name: 'agencyLang',
        message: "Please provide the agency's primary language (ISO 2 letter language code)",
        default: 'hu',
        validate: value => value.length === 2,
        store: true,
      },
      {
        type: 'input',
        name: 'agencyTZ',
        message: 'Please provide the timezone of operation',
        default: 'Europe/Budapest',
        store: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },

  writing() {
    this.fs.copy(
      this.templatePath('src/headers/shapes.txt'),
      this.destinationPath('src/headers/shapes.txt')
    );

    this.fs.copyTpl(
      this.templatePath('src/agency.txt'),
      this.destinationPath('src/agency.txt'),
      {
        agencyId: this.props.agencyId,
        agencyName: this.props.agencyName,
        agencyUrl: this.props.agencyUrl,
        agencyPhone: this.props.agencyPhone,
        agencyLang: this.props.agencyLang,
        timeZone: this.props.agencyTZ,
      }
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        agencyId: this.props.agencyId,
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        author: this.props.author,
        agencyName: this.props.agencyName,
      }
    );

    this.fs.copy(
      this.templatePath('validator'),
      this.destinationPath('validator')
    );
  },

  install() {
    this.installDependencies({
      bower: false,
    });
  },
});
