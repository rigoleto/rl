var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var mainBowerFiles = require('main-bower-files')
var rename = require("gulp-rename")

var paths = {
  js: ['assets/js/*'],
  css: ['assets/css/*'],
  images: 'assets/images/*',
  dist: 'dist'
}

paths.js = paths.js.concat(mainBowerFiles({ filter: /\.js/ }))
paths.css = paths.css.concat(mainBowerFiles({ filter: /\.css/ }))

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(concat('all.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(minifyCss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist))
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.css, ['css'])
})

gulp.task('default', ['js', 'css', 'images'])