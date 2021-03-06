/**
 * Created by youzhiping
 */
var gulp = require('gulp');
var run = require('run-sequence');
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('clean', function() {
    del(['./dist']);
});

gulp.task('scriptmin', function() {
    return gulp.src(['./bower_components/juicer/juicer.js','./src/script/prototype.js'])
        .pipe($.uglify())
        .pipe($.concat('prototype.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('dist', function(callback){
	run('clean', callback);
	setTimeout(function(){
		run('scriptmin');
	}, 2000);
});