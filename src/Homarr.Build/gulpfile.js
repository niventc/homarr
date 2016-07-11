/// <binding AfterBuild='moveToLibs' />
/// <binding AfterBuild='processLess' />

var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var path = require('path');

gulp.task('moveToLibs', function (done) {
    gulp.src([
      'node_modules/angular2/bundles/js',
      'node_modules/angular2/bundles/angular2.*.js*',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/http.*.js*',
      'node_modules/angular2/bundles/router.*.js*',
      'node_modules/es6-shim/es6-shim.min.js*',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      'node_modules/systemjs/dist/*.*',
      'node_modules/jquery/dist/jquery.*js',
      'node_modules/bootstrap/dist/js/bootstrap*.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/underscore/underscore-min.js'
    ]).pipe(gulp.dest('./wwwroot/libs/'));

    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/*.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));

    gulp.src([
      'node_modules/font-awesome/fonts/*.*',
    ]).pipe(gulp.dest('./wwwroot/libs/fonts'));

    gulp.src([
        'scripts/**/*.html'
    ]).pipe(gulp.dest('./wwwroot/scripts'));
});

gulp.task('processLess', function (done) {
    return gulp.src("./content/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest("./wwwroot/css"));
});

var lessSourcePath = "./content/**/*.less";
gulp.task('watch-less', function () {
    return gulp.src(lessSourcePath)
        .pipe(watch(lessSourcePath))
        .pipe(plumber())
        .pipe(debug({title: 'watch-less detected change: '}))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest("./wwwroot/css"));
});

var htmlSourcePath = 'scripts/**/*.html';
gulp.task('watch-html', function () {
    return gulp.src(htmlSourcePath)
        .pipe(watch(htmlSourcePath))
        .pipe(plumber())
        .pipe(debug({ title: 'watch-html detected change: ' }))
        .pipe(gulp.dest('./wwwroot/scripts'));
});

gulp.task('watch', ['watch-less', 'watch-html']);