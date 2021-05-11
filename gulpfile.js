const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sync = require('browser-sync').create()
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const del = require('del')
const posthtml = require('gulp-posthtml')
const include = require('posthtml-include')
const htmlmin = require('gulp-htmlmin')
const spritesmith = require('gulp.spritesmith');
const minify = require('gulp-minify');
 
const sprite = () => {
  return gulp.src('img/sprite-png/*.png')
    .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
    .pipe(gulp.dest('img/sprite-png'))
    .pipe(gulp.dest('build/img/sprite-png'))
}

exports.sprite = sprite

const images = () => {
  return gulp.src("img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"))
}

exports.images = images;

const styles = () => {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.dest('css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.dest('css'))
    .pipe(sync.stream())
}

exports.styles = styles

// HTML

const html = () => {
  return gulp.src('index.html')
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'))
    .pipe(sync.stream())
}

exports.html = html

// JS

const js = () => {
  return gulp.src('js/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build/js'))
    .pipe(gulp.dest('js'))
    .pipe(sync.stream())
}

exports.js = js

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false
  })
  done()
}

exports.server = server

// Watcher

const watcher = () => {
  gulp.watch('sass/**/*.scss', gulp.series('styles'))
  gulp.watch('index.html', gulp.series('html'))
  gulp.watch('js/**/*.js', gulp.series('js'))
}

exports.default = gulp.series(
  styles, html, js, server, watcher
)

// Clean

const clean = () => {
  return del('build')
}

exports.clean = clean

const copy = () => {
  return gulp.src([
    'fonts/**/*.{ttf,woff2}',
    'img/**',
    '*.ico'
  ], {
    base: './'
  })
    .pipe(gulp.dest('build'))
}

exports.copy = copy

const build = gulp.series(
  clean,
  copy,
  styles,
  sprite,
  html,
  js
)
exports.build = build

const start = gulp.series(
  build,
  server,
  watcher
)
exports.start = start
