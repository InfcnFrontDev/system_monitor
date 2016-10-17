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
const concat = require('gulp-concat');

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
const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    // devtool: 'source-map',
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        alias: {
            common: path.join(__dirname, "src/common"),
            static: path.join(__dirname, "src/static")
        },
        //当requrie的模块找不到时，添加这些后缀
        extensions: ['', '.js', '.vue', '.scss', '.css']
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

if (process.env.NODE_ENV == 'production') {
    //js文件的压缩
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

const processes = [
    autoprefixer({browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']}),
    precss,
    cssnano
];

gulp.task('clean', function () {
    del([
        'dist/'
    ]);
});

gulp.task('dev', function () {
    runSequence('compile', function () {
        server();
    })
});

gulp.task('build', function () {
    runSequence('compile', function () {
        //
    })
});

function server() {
    browserSync.init({
        startPath: "/",
        files: ["app/**/*.*", "!app/**/*.*__"],
        server: {
            baseDir: 'app'
        },
        open: false,
        notify: false
    });

    watch(['src/**/*.{js,vue}'], function (event) {
        console.log(event);
        compileJS('src/*.js', 'app/js/');
    });
}

gulp.task('compile', function () {
    compileJS('src/*.js', 'app/js/');
});

function compileJS(path, dest) {
    return gulp.src(path)
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            this.end()
        })
        .pipe(gulp.dest(dest))
}

gulp.task('echarts-themes', function () {
    gulp.src('app/js/plugin/echarts/themes/*.js')
        .pipe(concat('echarts-themes.min.js'))//合并后的文件名
        .pipe(uglify())
        .pipe(gulp.dest('app/js/plugin/echarts/'));
});

