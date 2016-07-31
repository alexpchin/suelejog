const gulp            = require('gulp');
const jshint          = require('gulp-jshint');
const uglify          = require('gulp-uglify');
const rename          = require('gulp-rename');
const concat          = require('gulp-concat');
const browserSync     = require('browser-sync').create();
const reload          = browserSync.reload;
const postcss         = require('gulp-postcss');
const sourcemaps      = require('gulp-sourcemaps');
const simplevars      = require('postcss-simple-vars');
const cssnext         = require('cssnext');
const mqpacker        = require('css-mqpacker');
const nestedcss       = require('postcss-nested');
const corepostcss     = require('postcss');
const cssnano         = require('cssnano');
const atImport        = require('postcss-import');
const clean           = require('gulp-clean');
const plumber         = require('gulp-plumber');
const mainBowerFiles  = require('main-bower-files');
const filter          = require('gulp-filter');
const order           = require('gulp-order');
const flatten         = require('gulp-flatten');

const destFolder = "./public";
const bower      = mainBowerFiles({
  "overrides": {
    "bootstrap": {
      "main": [
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    },
    "font-awesome": {
      "main": [
        "css/font-awesome.min.css",
        "fonts/*"
      ]
    }
  }
});

gulp.task('bower', [
  'bower:js',
  'bower:css',
  'bower:fonts',
]);

gulp.task('bower:js', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.js']))
    .pipe(sourcemaps.init())
    .pipe(concat('bower.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${destFolder}/js`));
});

gulp.task('bower:css', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.css']))
    .pipe(sourcemaps.init())
    .pipe(concat('_bower.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${destFolder}/css`));
});

gulp.task('bower:fonts', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.{eot,svg,ttf,woff,woff2}']))
    .pipe(flatten())
    .pipe(gulp.dest(`${destFolder}/fonts/`));
});

gulp.task('clean', () => {
  return gulp.src(`${destFolder}/dist`, {read: false})
    .pipe(clean());
});

gulp.task('css', () => {
  var processors = [
    atImport,
    cssnext({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    simplevars,
    nestedcss,
    mqpacker,
    cssnano()
  ];
  return gulp.src(`${destFolder}/css/style.css`)
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(plumber()
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(`${destFolder}/dist`)));
});

// Concatenate & Minify JS
gulp.task('scripts', () => {
  return gulp.src(`${destFolder}/js/*.js`)
  .pipe(order([
    "public/js/bower.js",
    'public/js/*.js'
  ]))
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(`${destFolder}/dist`))
  .pipe(reload({stream:true}));
});

// Watch
gulp.task('watch', () => {
  gulp.watch(`${destFolder}/css/**/*.css`, ['css', browserSync.reload]);
  gulp.watch(`${destFolder}/js/**/*.js`, ['scripts', browserSync.reload]);
  gulp.watch("./app/views/*.ejs", browserSync.reload);
});

// Setup defaut gulp task
gulp.task('default', [
  'clean',
  'bower',
  'css',
  'scripts',
  'watch'
]);
