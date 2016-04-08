var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('angular', function(){
    return gulp.src(['./public/javascripts/app.js',
                     './public/javascripts/services/*.js',
                     './public/javascripts/controllers/*.js'])
               .pipe(concat('ngApp.js')).on('error', errorHandler)
               .pipe(gulp.dest('./public/javascripts/'))
               .pipe(rename('ngApp.min.js'))
               .pipe(uglify()).on('error', errorHandler)
               .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('default',['angular'], function(){})

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
