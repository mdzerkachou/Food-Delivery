const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const pug = require('gulp-pug');
const svgo = require('gulp-svgo');


gulp.task('serve', ['sass', 'html', 'fonts', 'images' ], () => {

    browserSync.init({
        watch: true,
        server: "./dist"
    });

    gulp.watch("app/pug/**/*.pug", ['html']).on('change', browserSync.reload);
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/img/**/*", ['images']).on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});


gulp.task('sass', () => {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src('app/pug/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
        'app/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));
});

// Images
gulp.task('images', function() {
    return gulp.src([
        'app/img/**/*'])
        .pipe(svgo())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['serve', 'html', 'sass', 'fonts', 'images']);