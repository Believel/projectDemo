define(function(require, exports, module){
	var $ = require('jquery');
	require('form');
	$('#login').on('submit',function(){
		// 此插件提供功能让表单以异步的方式提交
		// 不需要写data属性，会自动的去匹配
		$(this).ajaxSubmit({
			url:'/login',
			type:'post',
			success:function(data){
				// alert(data.msg);
				if(data.code===10000){
					location.href = '/';
				}
			}
		})
		return false;
	})
})