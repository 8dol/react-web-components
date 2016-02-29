/**
 * Created by frank on 2/20/16.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const cheerio = require('gulp-cheerio');
const htmlmin = require('gulp-htmlmin');
const browserify = require('gulp-browserify');
//const ignore = require('gulp-ignore');
const fs = require('fs');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

fs.readFileSync('./components/', 'utf8', function () {

});

gulp.task('react-translator', ['clean'], function () {
    return gulp.src('components/nav/*.js').pipe(babel({
        presets: ['es2015', 'react'],
        plugins: ['transform-react-require']
    })).pipe(gulp.dest('dist/nav'));
});

gulp.task('build_html', ['react-translator'], function () {
    return gulp.src('index.html')
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('body').append(
                '<script src="../bower_components/react/react.js"></script>' +
                '<script src="../bower_components/react/react-dom.js"></script>' +
                '<script src="./app.js"></script>');
            $('head').append('<link href="../css/base.css" rel="stylesheet"/><link href="../css/component.css" rel="stylesheet"/><link href="./app.css" rel="stylesheet"/>');
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/nav'));
});

gulp.task('copy_css', ['build_html'], function () {
    return gulp.src(['components/css/*.*'])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy_fonts', ['copy_css'], function () {
    return gulp.src(['components/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy_lib', ['copy_fonts'], function () {
    return gulp.src(['bower_components/**'])
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('default', ['copy_lib']);
