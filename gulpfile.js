var gulp = require('gulp');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');

gulp.task('angular', function(){
    return gulp.src(['./public/javascripts/app.js',
                     './public/javascripts/services/*.js',
                     './public/javascripts/controllers/*.js'])
        .pipe(gp_concat('ngApp.js'))
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('compress', function(){
  return gulp.src('./public/javascripts/ngApp.js')
         .pipe(gp_rename('ngApp.min.js'))
         .pipe(gp_uglify()).on('error', errorHandler)
         .pipe(gulp.dest('./public/javascripts/'));
})

gulp.task('default',['angular', 'compress'], function(){})

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
