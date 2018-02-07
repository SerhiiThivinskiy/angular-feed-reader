let gulp = require('gulp');
let shell = require('gulp-shell');
let server = require('gulp-develop-server');


gulp.task('default', ['buildFrontend', 'startServer', 'watch']);

gulp.task('startServer', function () {
    server.listen({path: './bin/www'});
});

gulp.task('restartServer', function () {
    server.restart();
});

gulp.task('watch', function () {
    gulp.watch([
        './**/*.js'
    ], { interval: 500 }, server.restart);

    gulp.watch([
        './../frontend/src/**/*.ts',
        './../frontend/src/**/*.html',
        './../frontend/src/**/*.css'
    ], { interval: 500 }, ['buildFrontend', 'restartServer']);
});

gulp.task('buildFrontend', shell.task(
    [
        'ng build --output-path=../backend/public'
    ], {
        cwd: './../frontend',
        verbose: true
    }
));
