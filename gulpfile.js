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

gulp.task('watch', function(done) {
  gulp.watch('lib/*', gulp.series('compile:lib', 'browserify:demo'));
  gulp.watch('demo/src/*.pug', gulp.series('pug'));
  gulp.watch('demo/src/**/*.styl', gulp.series('democss'));
  gulp.watch('demo/src/**/*.js', gulp.series('browserify:demo'));
  gulp.watch('demo/src/images/**/*', gulp.series('images'));
  done();
});

gulp.task('clean:browserify', function() {
  return gulp.src(['dist'], { 
    allowEmpty: true,
    read: false
  }).pipe(clean());
});

gulp.task('clean:stylus', function() {
  return gulp.src(['lib/tmp'], { 
    allowEmpty: true,
    read: false
  }).pipe(clean());
});

gulp.task('clean:pug', function() {
  return gulp.src(['demo/dist/index.html'], { 
    allowEmpty: true,
    read: false
  }).pipe(clean());
});

gulp.task('clean:democss', function() {
  return gulp.src(['demo/dist/build/build.css'], { 
    allowEmpty: true,
    read: false
  }).pipe(clean());
});

gulp.task('clean', gulp.series('clean:browserify', 'clean:stylus', 'clean:pug'));



gulp.task('stylus', gulp.series('clean:stylus', function() {
  return gulp.src('lib/theme.styl')
    .pipe(isDemo ? plumber() : through())
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(csso())
    .pipe(gulp.dest('lib/tmp'));
}));

gulp.task('browserify:lib', gulp.series('stylus', function() {

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
}));

gulp.task('browserify:demo', gulp.series('stylus', function() {
    var b = browserify({ transform: ['brfs']});
    b.add('./demo/src/scripts/main.js');

    return b.bundle().pipe(isDemo ? plumber() : through())
      .pipe(source('build.js'))
      .pipe(gulp.dest('demo/dist/build'))
      .pipe(connect.reload());
}));

gulp.task('browserify', gulp.series('browserify:lib', 'browserify:demo'));


gulp.task('pug', gulp.series('clean:pug', function() {
  return gulp.src('demo/src/index.pug')
    .pipe(isDemo ? plumber() : through())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('demo/dist'))
    .pipe(connect.reload());
}));

gulp.task('democss', gulp.series('clean:democss', function() {
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
}));

gulp.task('xgif', function() {
  return gulp.src([
    'node_modules/x-gif/dist/*'
  ])
    .pipe(gulp.dest('demo/dist/x-gif'));
});

gulp.task('patterns', function() {
  return gulp.src('lib/patterns/**/*')
    .pipe(gulp.dest('demo/dist/images/patterns'))
    .pipe(connect.reload());
});

gulp.task('images', gulp.series('patterns', function() {
  return gulp.src('demo/src/images/**/*')
    .pipe(gulp.dest('demo/dist/images'))
    .pipe(connect.reload());
}));



gulp.task('compile:demo', gulp.series('pug', 'images', 'democss', 'xgif', 'browserify:demo'));

gulp.task('deploy', gulp.series('compile:demo', function(done) {
  ghpages.publish(path.join(__dirname, 'demo/dist'), { logger: gutil.log }, done);
}));


gulp.task('compile:lib', gulp.series('stylus', 'browserify'));
gulp.task('compile', gulp.series('compile:lib', 'compile:demo'));

gulp.task('connect', gulp.series('compile', function(done) {
  connect.server({
    port: 8062,
    root: 'demo/dist',
    livereload: true
  });

  opn('http://localhost:8062', done);
}));

gulp.task('demo', gulp.series('compile', 'watch', 'connect'));
gulp.task('default', gulp.series('clean', 'compile'));
