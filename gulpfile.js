const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const ngAnnotate = require('gulp-ng-annotate');
const shell = require('gulp-shell');
const image = require('gulp-image');
const webpack = require('gulp-webpack');
const plumber = require('gulp-plumber'); // Handle gulp.watch errors without throwing / cancelling nodemon
 
gulp.task('default', []);

const config = {
  src: {
    html: ['./client/**/*.html', './client/*.ico'],
    css: './client/styles/scss/*.scss',
    js: ['./client/index.js', './client/**/*.js'],
    img: ['./client/images/**', './client/images/**/*', '!./client/images/**/*.sketch']
  },
  build: {
    html: './dist/',
    css: './dist/styles/css/',
    js: '',
    img: './dist/images/'
  }
};

gulp.task('nodemon', function() {
  nodemon({
    script: 'server/server.js',
    ext: 'html js'
  })
  .on('restart', function() {
    console.log('nodemon restarted server!');
  });
});

gulp.task('lint', function() {
  gulp.src('./client/**/*.js') //, './server/**/*.js' add to lint serverside js
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  return gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('build-css', function() {
  var opts = { comments: true, spare: true };
  gulp.src(config.src.css)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(config.build.css))
    .pipe(minifyCSS(opts))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.build.css));
});

gulp.task('webpack', function() {
  return gulp.src('./client/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-html-files', function () {
  gulp.src(config.src.html)
    .pipe(plumber())
    .pipe(gulp.dest(config.build.html));
});

gulp.task('image', function () {
  gulp.src(config.src.img)
    .pipe(image())
    .pipe(gulp.dest(config.build.img));
});

gulp.task('set-prod', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-dev', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('forever', shell.task([
  'forever start server/server.js'
]));

gulp.task('stop', shell.task([
  'forever stop server/server.js'
]));

gulp.task('build', function() {
  runSequence(
    'clean',
    ['build-css', 'webpack', 'copy-html-files', 'image']
  );
});

gulp.task('watch', function() {
  gulp.watch(config.src.css, ['build-css']);
  gulp.watch(config.src.js, ['webpack']);
  gulp.watch(config.src.html, ['copy-html-files']);
  gulp.watch(config.src.img, ['image']);
});

gulp.task('default', function() {
  runSequence(
    'set-dev',
    'build',
    'watch',
    'nodemon'
  );
});

/*
gulp.task('prodStart', function() {
  runSequence(
    'set-prod',
    'build',
    'forever'
  );
});
*/