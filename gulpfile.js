const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

function css() {
    return src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('public'))
}

function js() {
    return src(['assets/js/custom.js'], { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('public/scripts/', { sourcemaps: true }));
}

function watchFiles() {
    watch('./assets/scss/**/*', css);
    watch("./assets/js/*", js);
}
exports.css = css;
exports.js = js;
exports.watch = watch;
exports.default = parallel(css, js, watchFiles);