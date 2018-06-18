const gulp = require('gulp');
const glob = require('glob');

glob('./gulp/**/*.js', {ignore: './gulp/inc/**/*', sync: true}).forEach(function (file) {
    const task = require(file);
    const name = file.replace(/^\.\/gulp\//, '').replace(/\.js$/, '').split('/').join(':');
    const deps = task.deps ? task.deps : [];
    const fn = typeof task === 'function' ? task : task.fn ? task.fn : function () {};
    gulp.task(name, deps, fn);
});