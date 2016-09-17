/* global describe b:true */
/* global before b:true */
/* global it b:true */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const props = {
  author: 'Test Author',
  agencyName: 'Test Agency',
  agencyId: 'AgencyLtd',
  agencyUrl: 'https://agency.com/',
  agencyTZ: 'Europe/Budapest',
};

describe('generator-gtfs-builder:app', () => {
  describe('when every input is properly provided', () => {
    before(() =>
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          author: props.author,
          agencyName: props.agencyName,
          agencyId: props.agencyId,
          agencyUrl: props.agencyUrl,
          agencyTZ: props.agencyTZ,
        })
        .toPromise()
    );

    it('creates files', () => {
      assert.file([
        'gulpfile.js',
        'package.json',
        'validator/feedvalidator.py',
        'src/headers/shapes.txt',
        // 'src/headers/stops.txt',
        // 'src/headers/trips.txt',
        'src/agency.txt',
      ]);
    });

    it('feed is not generated', () => {
      assert.noFile([
        `${props.agencyId}.zip`,
      ]);
    });

    it('package name is properly set in gulpfile', () => {
      assert.fileContent('gulpfile.js', `var packageName = '${props.agencyId}.zip';`);
    });

    it("gulpfile contains a task named 'clean'", () => {
      assert.fileContent('gulpfile.js', "gulp.task('clean'");
    });

    it("gulpfile contains a task named 'combine'", () => {
      assert.fileContent('gulpfile.js', "gulp.task('combine'");
    });

    it("gulpfile contains a task named 'validate'", () => {
      assert.fileContent('gulpfile.js', "gulp.task('validate'");
    });

    it("gulpfile contains a task named 'package'", () => {
      assert.fileContent('gulpfile.js', "gulp.task('package'");
    });

    it("gulpfile contains a task named 'geojson'", () => {
      assert.fileContent('gulpfile.js', "gulp.task('geojson'");
    });
  });
});
