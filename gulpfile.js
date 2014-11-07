var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var mainBowerFiles = require('main-bower-files')

var paths = {
  js: ['assets/js/*'],
  css: ['assets/css/*'],
  images: 'assets/images/*',
  dist: 'dist'
};

// console.log(mainBowerFiles({ filter: /\.js/ }))

paths.js = paths.js.concat(mainBowerFiles({ filter: /\.js/ }))
paths.css = paths.css.concat(mainBowerFiles({ filter: /\.css/ }))

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['js', 'css', 'images']);