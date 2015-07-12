import gulp from 'gulp'
import babel from 'gulp-babel'

const SRC = 'takahashi/**/*.js'
const OUTPUT = '.'

gulp.task(build)

gulp.task(function dev() {
	gulp.watch(SRC, build)
})

function build() {
	gulp.src(SRC)
		.pipe(babel())
		.pipe(gulp.dest(OUTPUT))
}
