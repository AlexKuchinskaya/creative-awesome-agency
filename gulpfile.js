const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sync = require('browser-sync').create()
const csso = require('gulp-csso')
const rename = require('gulp-rename')
// const imagemin = require('gulp-imagemin')
// const webp = require('gulp-webp')
// const svgstore = require('gulp-svgstore')
const del = require('del')
const posthtml = require('gulp-posthtml')
const include = require('posthtml-include')
const htmlmin = require('gulp-htmlmin')
const spritesmith = require('gulp.spritesmith');
 
const sprite = () => {
  return gulp.src('source/img/sprite-png/*.png')
    .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
    // .pipe(rename("sprite.scss"))
    .pipe(gulp.dest('build/img/sprite-png'));
}

exports.sprite = sprite

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.dest('source/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.dest('source/css'))
    .pipe(sync.stream())
}

exports.styles = styles

// HTML

const html = () => {
  return gulp.src('source/index.html')
    .pipe(rename('index.html'))
    // .pipe(posthtml([include()]))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'))
    .pipe(sync.stream())
}

exports.html = html

const js = () => {
  return gulp.src('source/js/**/*.js')
    // .pipe(posthtml([include()]))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/js'))
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
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'))
  gulp.watch('source/index.html', gulp.series('html'))
  gulp.watch('source/js/**/*.js', gulp.series('js'))
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
    'source/fonts/**/*.{ttf,woff2}',
    'source/img/**',
    // 'source/js/**/*.js',
    'source/*.ico'
  ], {
    base: 'source'
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
