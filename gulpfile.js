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
}

exports.default = gulp.series(
  styles, html, server, watcher
)
// Clean

const clean = () => {
  return del('build')
}

exports.clean = clean

const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{ttf,woff2}',
    'source/img/**'
    // 'source/js/**/*.js',
    // 'source/*.ico'
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
  html
)
exports.build = build

const start = gulp.series(
  build,
  server,
  watcher
)
exports.start = start
