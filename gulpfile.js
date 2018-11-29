var gulp = require('gulp');

gulp.task('styles', function(){
    return gulp.src('css/flight/flight.css')
    .pipe(gulp.dest('dist/css/flight'))
})