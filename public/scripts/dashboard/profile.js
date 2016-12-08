define(function(require, exports, module){
	var $ = require('jquery');
	require('datepicker');//日期插件
	require('language');// 汉化
	// 使用js方式使用日期插件
	$('#datepicker').datepicker({
		format:'yyyy-mm-dd',
		language:'zh-CN'
	})
})