const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('css', () => {
  gulp.src('./src/client/css/**')
    .pipe(concat('main.css'))
    // .pipe(uglify())
    .pipe(gulp.dest('./distr/client/public'))
});

gulp.task('img', () => {
  gulp.src('./src/client/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./distr/client/public/images'));
});

gulp.task('js', () => {
  gulp.src(['./src/client/vendor/jquery.js', './src/client/vendor/webfont.js', './src/client/js/**'])
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('./distr/client/public'));
});

gulp.task('server', () => {
  gulp.src('./src/server/**')
    .pipe(gulp.dest('./distr/server'));
});

gulp.task('sh', () => {
  gulp.src('./src/run.sh')
    .pipe(gulp.dest('./distr'));
});

gulp.task('package', () => {
  gulp.src('./package.json')
    .pipe(gulp.dest('./distr'));
});

gulp.task('build', ['css', 'img', 'js', 'server', 'sh', 'package']);
