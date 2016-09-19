const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const bsReload = browserSync.reload;
const del = require('del');

gulp.task('clean', function () {
    del([
        'dist/'
    ]);
});

gulp.task('dev', function () {
    browserSync.init({
        startPath: "/",
        files: ["src/**/*.*"],
        server: {
            baseDir: 'src'
        },
        open: false,
        notify: true
    });
});

gulp.task('build', function () {
    // gulp.src('./app/vendors/**/*.*').pipe(gulp.dest('./dist/vendors/'));
    // gulp.src('./dev/static/fonts/*.*').pipe(gulp.dest('./dist/static/fonts/'));
    // gulp.src('./dev/static/images/**/*.*').pipe(gulp.dest('./dist/static/images/'));
    // gulp.src('./dev/static/js/*.js').pipe(replace('/static/', 'static/')).pipe(uglify()).pipe(gulp.dest('./dist/static/js/'));
    // gulp.src('./dev/static/css/*.css').pipe(minifycss()).pipe(gulp.dest('./dist/static/css/'));
    // gulp.src('./dev/*.html').pipe(gulp.dest('./dist/'));
});

