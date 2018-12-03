var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('styles', function(){
    return gulp.src('./css/**/*.css')
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(notify('css 编译完毕。。。'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('sass', function(){
    return gulp.src('sass/flight/flight.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(notify({message: 'sass 编译完毕。。。'}))
    .pipe(gulp.dest('dist/sass/flight')) 
})

gulp.task('js', function(){
    return gulp.src('js/**/*.js')
    .pipe(uglify({
        mangle:{ 
            toplevel: true, //混淆变量
            reserved: ['test'] //保留关键字
        } 
    }))
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({suffix: '.min'}))
    .pipe(notify('js 压缩完成'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('img', function(){
    return gulp.src('img/**/*')
    .pipe(
        cache(
            imagemin({
                optimizationLevel: 3, //压缩等级
                progressive: true,
                interlaced: true
            })
        )
    )
    .pipe(notify('图片压缩完成'))
    .pipe(gulp.dest('dist/img'))
})


//删除文件
gulp.task('clean', function(){
    del(['dist/css', 'dist/sass', 'dist/js', 'dist/img'])
})

//监听文件
gulp.task('watch', function(){
    gulp.watch('css/**/*.css',['styles']);
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('img/**/*',['img']);
})

//需要在浏览器按照livereload插件
// gulp.task('watch', function(){
//     livereload.listen();
//     gulp.watch(['dist/**']).on('change',livereload.changed);
// })

//默认任务 gulp这样无法保证执行顺序 不推荐
// gulp.task('default',['clean','styles','sass'])

//默认任务 这样写有问题，最好先执行gulp clean再执行gulp
// gulp.task('default',['clean'], function(){
//     gulp.start('styles','sass');
// })

//默认任务
gulp.task('default',['styles','sass'])
