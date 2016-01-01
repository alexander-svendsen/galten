var gulp = require('gulp');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var minify = require('gulp-minify');


gulp.task('babelify', function() {
    browserify({
        entries: './public/js/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      //note: to ensure that gulp watch dosn't stop
      console.log(err)
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/dist'))
    .pipe(livereload());
});

gulp.task('minify', function() {
  gulp.src('public/dist/*.js')
    .pipe(minify())
    .pipe(gulp.dest('public/dist'))
});

gulp.task('build', ['babelify', 'minify']);

gulp.task('html', function() {
    gulp.src("").pipe(livereload());
});

gulp.task('css', function() {
    gulp.src("").pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./public/js/**/*.jsx', ['babelify']);
    gulp.watch('./public/index.html', ['html']);
    gulp.watch('./public/css/*.css', ['css']);
})

gulp.task('default', ['babelify', 'watch']);
