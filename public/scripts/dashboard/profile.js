define(function(require, exports, module){
	var $ = require('jquery');
	require('datepicker');//日期插件
	require('language');// 汉化
	require('region');//省级联动插件
	var ck = require('ckeditor');//编辑器插件
	ck.replace("teacherIntroduce");
	// 使用js方式使用日期插件
	$('#datepicker').datepicker({
		format:'yyyy-mm-dd',
		language:'zh-CN'
	})
	// 使用省级联动插件
	$('.hometown').region({
		url:'/region'
	})
})