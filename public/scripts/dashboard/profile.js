define(function(require, exports, module){
	var $ = require('jquery');
	require('datepicker');//日期插件
	require('language');// 汉化
	require('region');//省级联动插件
	require('form'); // 引入表单插件
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
	// 提交表单数据到数据库
	$('#updateTeacher').on('submit',function(){
		// 提交ckeditor数据
		// 解释一下：富文本编辑器本身没有数据添加的功能，需要处理一下
		for(instance in CKEDITOR.instances){
			CKEDITOR.instances[instance].updateElement();
		}

		$(this).ajaxSubmit({
			url: '/update',
			type: 'post',
			success: function(data){
				alert(data.msg);
				if(data.code===10000){
					location.reload();//刷新页面
					// location.href = '/teacher';
				}
			}
		});
		return false;
	})
	
})