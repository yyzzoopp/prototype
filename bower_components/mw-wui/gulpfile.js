/**
 * Created by youzhiping
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var run = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * 生产环境打包
 */

gulp.task('del', function () {
    log('---------- del Start ----------');
    del([
        './dist'
    ]);
});

gulp.task('cssmin', function () {
    log('---------- Css Optimizer Start ----------');
    return gulp.src('./src/less/wui.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.cssnano())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function () {
    log('---------- copy start ----------');
    return gulp.src('./src/font/*')
        .pipe(gulp.dest('./dist/font'));
});

gulp.task('dist', function (callback) {
    run('del', callback);
    setTimeout(function(){
        run(
        'cssmin',
        'copy'
    )
    }, 2000);
});

/**
 * 开发环境
 */

gulp.task('less', function(){
    return gulp.src(['./src/less/mwui.less'])
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch',['server-dev'], function(){
    gulp.watch('./src/less/**/*.less',['less']);
});

gulp.task('dev', function(callback){
    run(
        'less',
        'watch',
        callback
    );
});

gulp.task('server-dev', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        port: 8001
    });
});

gulp.task('test-less', function(){
    return gulp.src(['./src/less/wui.less'])
        .pipe($.less())
        .pipe(gulp.dest('./src/css'));
});

//print info
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}