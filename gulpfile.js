// 二哲 - 2016年08月15日
const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const del = require('del');
const watchPath = require('gulp-watch-path');
const replace = require('gulp-replace');

const browserSync = require('browser-sync').create();
const base64 = require('gulp-base64');
const runSequence = require('run-sequence');
const bsReload = browserSync.reload;
const postcss = require('gulp-postcss'); //postcss本身
const autoprefixer = require('autoprefixer');
const precss = require('precss'); //提供像scss一样的语法
const cssnano = require('cssnano');  //更好用的css压缩!
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
var webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        alias: {
            common: path.join(__dirname, "src/common"),
            static: path.join(__dirname, "src/static")
        },
        extensions: ['', '.js', '.vue', '.scss', '.css']
    },
    output: {
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[id].js?[hash]'
    },
    module: {
        noParse: [/vue.js/],
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'images/[name].[ext]?[hash:10]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [],
    babel: { //配置babel
        "presets": ["es2015", 'stage-2'],
        "plugins": ["transform-runtime"]
    }
};

const processes = [
    autoprefixer({browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']}),
    precss,
    cssnano
];
// background: color($blue blackness(20%));  precss为了用这样的语法

gulp.task('clean', function () {
    del([
        'dist/',
        'dev/'
    ]);
});
gulp.task('dev', function () {
    runSequence('compile', function () {
        server();
    })
});
gulp.task('build', function () {
    // gulp.src('./dev/vendors/**/*.*').pipe(gulp.dest('./dist/vendors/'));
    // gulp.src('./dev/static/fonts/*.*').pipe(gulp.dest('./dist/static/fonts/'));
    // gulp.src('./dev/static/images/**/*.*').pipe(gulp.dest('./dist/static/images/'));
    // gulp.src('./dev/static/js/*.js').pipe(replace('/static/', 'static/')).pipe(uglify()).pipe(gulp.dest('./dist/static/js/'));
    // gulp.src('./dev/static/css/*.css').pipe(minifycss()).pipe(gulp.dest('./dist/static/css/'));
    // gulp.src('./dev/*.html').pipe(gulp.dest('./dist/'));
});


function server() {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*"],
        server: {
            baseDir: 'app'
        },
        open: false,
        reloadDelay: 1000,
        //reloadDebounce: 2000,
        notify: false
    });

    watch(['src/**/*.{js,vue}'], function (event) {
        compileJS('src/main.js', 'app/js/');
    });
    watch(['src/**/*.html'], function (event) {
        compileView('src/index.html', 'app/ajax/');
    });
}

gulp.task('compile', function () {
    compileJS('src/main.js', 'app/js/');
    compileView('src/index.html', 'app/ajax/');
});

function compileJS(path, dest) {
    return gulp.src(path)
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            this.end()
        })
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest(dest))
}

function compileView(src, dest) {
    gulp.src(src)
        .pipe(gulp.dest(dest));
}

function cp(from, to) {
    gulp.src(from)
        .pipe(gulp.dest(to));
}

