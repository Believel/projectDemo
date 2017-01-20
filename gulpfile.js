var gulp = require('gulp');

//清空
var clean = require('gulp-clean');

// 定义idleading
var transport = require('gulp-seajs-transport');

// 合并包
var concat = require('gulp-seajs-concat');

// 压缩
var uglify = require('gulp-uglify');
// 清空原来的东西
gulp.task('clean', function(){
	return gulp.src('./public/dist')
		.pipe(clean());
})

gulp.task('seajsmodule',['clean'],function(){
	//专门处理自己定义的模块化的资源
	gulp.src('./public/scripts/**/*.js')
		.pipe(transport({
			idleading:'/dist/' //给idleading前面添加的前缀
		}))
		.pipe(concat())
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist')) //构建之后所放的路径的地方

})
//第一个参数：任务名
//第二个参数：依赖的任务
gulp.task('default',['seajsmodule']);
