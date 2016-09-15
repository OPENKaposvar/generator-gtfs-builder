'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var props = {
  author: "Test Author",
  agencyName: "Test Agency",
  agencyId: "AgencyLtd",
  agencyUrl: "https://agency.com/",
  agencyTZ: "Europe/Budapest"
};

describe('generator-gtfs-builder:app', function () {
  describe('when every input is properly provided', function() {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          author: props.author,
          agencyName: props.agencyName,
          agencyId: props.agencyId,
          agencyUrl: props.agencyUrl,
          agencyTZ: props.agencyTZ
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

    it('feed is not generated', function () {
      assert.noFile([
        props.agencyId + '.zip'
      ]);
    });

    it('package name is properly set in gulpfile', function() {
      assert.fileContent('gulpfile.js', "var packageName = '" + props.agencyId + ".zip';");
    });

    it("gulpfile contains a task named 'clean'", function() {
      assert.fileContent('gulpfile.js', "gulp.task('clean'");
    });

    it("gulpfile contains a task named 'combine'", function() {
      assert.fileContent('gulpfile.js', "gulp.task('combine'");
    });

    it("gulpfile contains a task named 'validate'", function() {
      assert.fileContent('gulpfile.js', "gulp.task('validate'");
    });

    it("gulpfile contains a task named 'package'", function() {
      assert.fileContent('gulpfile.js', "gulp.task('package'");
    });

    it("gulpfile contains a task named 'geojson'", function() {
      assert.fileContent('gulpfile.js', "gulp.task('geojson'");
    });
  });
});
