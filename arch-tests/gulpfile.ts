const { series } = require('gulp');
const del = require('del');
const ts = require("gulp-typescript");
const gulp = require("gulp");
const tsProject = ts.createProject("tsconfig.json");

// always use, otherwise task will not wait itself
const promisifyStream = (stream) => new Promise(res => stream.on('end', res));

const clean = async (): Promise<void> => {
    await del(['dist/*'])
}

const build = async (): Promise<void> => {
    await promisifyStream(
      tsProject.src()
      .pipe(tsProject()).js
      .pipe(gulp.dest('dist'))
    );
}

gulp.task(build);
gulp.task(clean);

exports.clean = clean;
exports.build = build;

exports.default = series(clean, build);
