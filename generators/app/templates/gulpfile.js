/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/no-unresolved: [2, { ignore: ['gulp-$', 'gtfs2geojson'] }] */
const packageName = '<%= agencyId %>.zip';

const gulp = require('gulp');
const zip = require('gulp-zip');
const exec = require('child_process').execFile;
const fileProcess = require('gulp-file-process');
const util = require('gulp-util');
const open = require('gulp-open');
const concat = require('gulp-concat');
const gtfs2geojson = require('gtfs2geojson');
const fs = require('fs');
const del = require('del');

gulp.task('clean', () =>
  del([
    'dist/**/*',
    'geojson/**/*',
  ])
);

gulp.task('combine', () =>
  gulp.src([
    './src/headers/shapes.txt',
    './src/shapes/shapes_*.txt',
  ])
  .pipe(concat('shapes.txt'))
  .pipe(gulp.dest('./feed/'))
);

gulp.task('validate', ['combine'], (cb) => {
  let errorMsg = null;

  exec('python', [
    'validator/feedvalidator.py',
    '-n',
    '-o',
    'dist/validator-report.html',
    'feed/',
  ], (err, stdout) => {
    if (stdout.indexOf(' error') !== -1) {
      stdout.split('\n').forEach(line => util.log(line));
      errorMsg = 'GTFS feed validation failed!';
    } else if (stdout.indexOf(' warning') !== -1) {
      util.log('Validation passed but warnings occured. See dist/validator-report.html for details!');
    }

    gulp.src('dist/validator-report.html').pipe(open());
    return cb(errorMsg);
  });
});

gulp.task('package', ['validate'], () =>
    gulp.src('feed/*.txt')
      .pipe(zip(packageName))
      .pipe(gulp.dest('dist'))
);

gulp.task('geojson', ['validate'], (cb) => {
  gulp.src('feed/stops.txt')
  .pipe(fileProcess({
    process(file, content) {
      const result = gtfs2geojson.stops(content);
      fs.writeFileSync('geojson/stops.geojson', JSON.stringify(result, null, 2));
    },
  }));

  gulp.src('feed/shapes.txt')
    .pipe(fileProcess({
      process(file, content) {
        const result = gtfs2geojson.lines(content);
        fs.writeFileSync('geojson/lines.geojson', JSON.stringify(result, null, 2));
      },
    }));

  return cb();
});

gulp.task('default', () => {
  gulp.start('clean', 'combine', 'validate', 'package', 'geojson');
});
