'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-gtfs-builder:app', function () {
  describe('when every input is properly provided', function() {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          author: "Test Author",
          agencyName: "Test Agency",
          agencyId: "AgencyLtd",
          agencyUrl: "https://agency.com/",
          agencyTZ: "Europe/Budapest"
        })
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        'gulpfile.js',
        'package.json',
        'validator/feedvalidator.py',
        'src/headers/shapes.txt',
        //'src/headers/stops.txt',
        //'src/headers/trips.txt',
        'src/agency.txt'
      ]);
    });
  });
});
