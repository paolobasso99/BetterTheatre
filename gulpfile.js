var gulp = require('gulp');


// Variables
var project = require('./package.json');
var sourcePath = './src/';
var distPath = './dist/';


// Modules
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');


// Compilers
gulp.task('sass', function(done) {
    gulp.src(sourcePath + 'sass/**/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(project.name+ '.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(distPath + 'GoogleChrome/css/'))
        .pipe(gulp.dest(distPath + 'MozillaFirefox/css/'));

    done();
});

gulp.task('images', function(done) {
    gulp.src(sourcePath + 'assets/**/*.*')
        .pipe(gulp.dest(distPath + 'GoogleChrome/assets/'))
        .pipe(gulp.dest(distPath + 'MozillaFirefox/assets/'));

    done();
});


// Tasks to use
gulp.task('default', gulp.series('sass', 'images'));

gulp.task('watch', function() {
    gulp.watch(sourcePath + 'sass/**/main.scss', ['sass']);
    gulp.watch(sourcePath + 'assets/**/*.*', ['images']);
});