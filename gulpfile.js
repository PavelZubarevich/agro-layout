var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    Del = require('del'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    babel = require("gulp-babel"),
    fileinclude = require('gulp-file-include');


function css () {
  return gulp.src('#src/scss/style.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gcmq())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 version" ],
      cascade: true
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}


function html () {
  return gulp.src('#src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}


function js () {
  return gulp.src('#src/js/script.js')
    .pipe(fileinclude())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.src('#src/js/script.js'))
    .pipe(fileinclude())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}


function img () {
    browserSync.stream();
}

function fonts () {
    // gulp.src('#src/fonts/*.ttf')
    // .pipe(ttf2woff())
    // .pipe(gulp.dest('dist/fonts'))
    // return gulp.src('#src/fonts/*.ttf')
    // .pipe(ttf2woff2())
    // .pipe(gulp.dest('dist/fonts'))
    browserSync.stream();
}


function reload () {
  browserSync.init({
    server: "dist",
    port:3001,
    notify:false
  })
}


function watch () {
  gulp.watch('#src/*.html', html);
  gulp.watch('#src/scss/**/*.scss', css);
  gulp.watch('#src/js/**/*.js', js);
  gulp.watch('dist/img', img);
  gulp.watch('#src/fonts', fonts);
}


function del () {
    return Del(['dist/**', '!dist/img', '!dist/fonts']);
}

exports.fonts = fonts;
exports.img = img;
exports.del = del;
exports.html = html;
exports.js = js;
exports.watch = watch;
exports.reload = reload;
exports.css = css;
exports.default = gulp.parallel(reload, watch, gulp.series(html, css, js, img, fonts))