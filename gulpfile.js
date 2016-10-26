var gulp = require('gulp'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  pug = require('gulp-pug'),
  connect = require('gulp-connect'),
  plumber = require('gulp-plumber'),
  opn = require('opn'),
  pkg = require('./package.json'),
  browserify = require('browserify'),
  through = require('through'),
  path = require('path'),
  ghpages = require('gh-pages'),
  streamify = require('gulp-streamify'),
  template = require('lodash').template,
  source = require('vinyl-source-stream'),
  isDemo = process.argv.indexOf('demo') > 0;

gulp.task('default', ['clean', 'compile']);
gulp.task('demo', ['compile', 'watch', 'connect']);
gulp.task('compile', ['compile:lib', 'compile:demo']);
gulp.task('compile:lib', ['stylus', 'browserify:lib']);
gulp.task('compile:demo', ['pug', 'images', 'democss', 'xgif', 'browserify:demo']);

gulp.task('watch', function() {
  gulp.watch('lib/*', ['compile:lib', 'browserify:demo']);
  gulp.watch('demo/src/*.pug', ['pug']);
  gulp.watch('demo/src/**/*.styl', ['democss']);
  gulp.watch('demo/src/**/*.js', ['browserify:demo']);
  gulp.watch('demo/src/images/**/*', ['images']);
});

gulp.task('clean', ['clean:browserify', 'clean:stylus', 'clean:pug']);
gulp.task('clean:browserify', ['clean:browserify:lib']);

gulp.task('clean:browserify:lib', function() {
  return gulp.src(['dist'], { read: false })
    .pipe(clean());
});

gulp.task('clean:stylus', function() {
  return gulp.src(['lib/tmp'], { read: false })
    .pipe(clean());
});

gulp.task('clean:pug', function() {
  return gulp.src(['demo/dist/index.html'], { read: false })
    .pipe(clean());
});

gulp.task('clean:democss', function() {
  return gulp.src(['demo/dist/build/build.css'], { read: false })
    .pipe(clean());
});

gulp.task('stylus', ['clean:stylus'], function() {
  return gulp.src('lib/theme.styl')
    .pipe(isDemo ? plumber() : through())
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(csso())
    .pipe(gulp.dest('lib/tmp'));
});

gulp.task('browserify', ['browserify:lib', 'browserify:demo']);

gulp.task('browserify:lib', ['clean:browserify:lib', 'stylus'], function() {

  var b = browserify({  transform: ['brfs'], standalone: 'bespoke.themes.atomantic'});
  b.add('./lib/bespoke-theme-atomantic.js');

  return b.bundle()
    .pipe(isDemo ? plumber() : through())
    .pipe(source('bespoke-theme-atomantic.js'))
    .pipe(header(template([
      '/*!',
      ' * <%= name %> v<%= version %>',
      ' *',
      ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
      ' * This content is released under the <%= license %> license',
      ' */\n\n'
    ].join('\n'))(pkg)))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('bespoke-theme-atomantic.min.js'))
    .pipe(streamify(uglify()))
    .pipe(header(template([
      '/*! <%= name %> v<%= version %> ',
      '© <%= new Date().getFullYear() %> <%= author.name %>, ',
      '<%= license %> License */\n'
    ].join(''))(pkg)))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify:demo', function() {
    var b = browserify({ transform: ['brfs']});
    b.add('./demo/src/scripts/main.js');

    return b.bundle().pipe(isDemo ? plumber() : through())
      .pipe(source('build.js'))
      .pipe(gulp.dest('demo/dist/build'))
      .pipe(connect.reload());
});

gulp.task('pug', ['clean:pug'], function() {
  return gulp.src('demo/src/index.pug')
    .pipe(isDemo ? plumber() : through())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('demo/dist'))
    .pipe(connect.reload());
});

gulp.task('democss', ['clean:democss'], function() {
  return gulp.src('demo/src/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      // Allow CSS to be imported from node_modules
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(csso())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('demo/dist/build'))
    .pipe(connect.reload());
});

gulp.task('xgif', function() {
  return gulp.src([
    'node_modules/x-gif/dist/*'
  ])
    .pipe(gulp.dest('demo/dist/x-gif'));
});

gulp.task('images', ['patterns'], function() {
  return gulp.src('demo/src/images/**/*')
    .pipe(gulp.dest('demo/dist/images'))
    .pipe(connect.reload());
});

gulp.task('patterns', function() {
  return gulp.src('lib/patterns/**/*')
    .pipe(gulp.dest('demo/dist/images/patterns'))
    .pipe(connect.reload());
});

gulp.task('connect', ['compile'], function(done) {
  connect.server({
    port: 8062,
    root: 'demo/dist',
    livereload: true
  });

  opn('http://localhost:8062', done);
});

gulp.task('deploy', ['compile:demo'], function(done) {
  ghpages.publish(path.join(__dirname, 'demo/dist'), { logger: gutil.log }, done);
});
