// --- CONFIGURE HERE ---
// Name of the generated package
var packageName = '<%= agencyId %>.zip';

var gulp = require('gulp'),
  zip = require('gulp-zip'),
  exec = require('child_process').execFile,
  fileProcess = require('gulp-file-process'),
  util = require('gulp-util'),
  open = require('gulp-open'),
  concat = require('gulp-concat'),
  gtfs2geojson = require('gtfs2geojson'),
  fs = require('fs'),
  del = require('del');

gulp.task('clean', function() {
    return del([
      'dist/**/*',
      'geojson/**/*'
    ]);
});

gulp.task('combine', function() {
  return gulp
    .src([
      './src/headers/shapes.txt',
      './src/shapes/shapes_*.txt'
    ])
    .pipe(concat('shapes.txt'))
    .pipe(gulp.dest('./feed/'));
});

gulp.task('validate', ['combine'], function(cb) {
  var errorMsg = null;

  exec("python", ['validator/feedvalidator.py', '-n', '-o', 'dist/validator-report.html', 'feed/'], function(err, stdout, stderr) {
    if (stdout.indexOf(" error") !== -1) {
      stdout.split("\n").forEach((line) => util.log(line));
      errorMsg = "GTFS feed validation failed!";
    } else if (stdout.indexOf(" warning") !== -1) {
      util.log("Validation passed but warnings occured. See dist/validator-report.html for details!");
    }

    gulp.src('dist/validator-report.html').pipe(open());
    return cb(errorMsg);
  });
});

gulp.task('package', ['validate'], function() {
    return gulp.src('feed/*.txt')
      .pipe(zip(packageName))
      .pipe(gulp.dest('dist'));
});

gulp.task('geojson', ['validate'], function(cb) {
  gulp.src('feed/stops.txt')
    .pipe(fileProcess({
      process: function(file, content) {
        var result = gtfs2geojson.stops(content);
        fs.writeFileSync('geojson/stops.geojson', JSON.stringify(result, null, 2));
      }
    }));

    gulp.src('feed/shapes.txt')
      .pipe(fileProcess({
        process: function(file, content) {
          var result = gtfs2geojson.lines(content);
          fs.writeFileSync('geojson/lines.geojson', JSON.stringify(result, null, 2));
        }
      }));

    return cb();
});

gulp.task('default', function() {
  gulp.start('clean', 'combine', 'validate', 'package', 'geojson');
});
