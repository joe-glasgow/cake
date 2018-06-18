const gulp = require('gulp');
const rename = require('gulp-rename');
module.exports = {
    deps: [
        'clean'
    ],
    fn() {
        return gulp.src("app/**/**.html")
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest('dist/web'));
    }
};