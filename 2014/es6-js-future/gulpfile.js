'use strict'

var gulp = require('gulp')
var jsdc = require('gulp-jsdc')

gulp.task('watch', function () {
	gulp.watch('src/*.js', ['jsdc'])
})

gulp.task('jsdc', function () {
	gulp.src('src/*.js').
		pipe(jsdc()).
		pipe(gulp.dest('dist/'))
})
