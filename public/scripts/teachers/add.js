define(function (require, exports, module) {

	// 引入jquery文件
	var $ = require('jquery');
	// 引入jquery插件，验证插件
	require('validate');
	require('form');
	require('datepicker');
	require('language');
	// 测试jquery插件是否引入进来
	// console.log($.fn);
	
	$('#addTeacher').validate({
				 onKeyup:true,//何种条件下触发验证
		        sendForm:false, // return false 阻止表单默认提交
		eachInvalidField:function(){
			// 当元素不合法时，会触发此方法
			// console.log(1111)
			$(this)
			.parents('.form-group')
			.removeClass('has-success')
			.addClass('has-error');
			$(this)
			.next().
			removeClass('glyphicon-ok')
			.addClass('glyphicon-remove ');
		},
		eachValidField:function(){
			// console.log(2222)
			$(this)
			.parents('.form-group')
			.removeClass('has-error')
			.addClass('has-success');
			$(this)
			.next()
			.removeClass('glyphicon-remove')
			.addClass('glyphicon-ok ');
		},
		valid:function(){
			// console.log('合法');
		      var url = $(this).attr('action').trim();
			//所有表单元素都合法才触发
			$(this).ajaxSubmit({
				url: url,
				type: 'post',
				success: function (info) {
				// alert(info.msg);//添加成功
				if(info.code == 10000) {
					// 如果与后台返回的状态码相等，那么就刷新当前页
					// location.reload();
					location.href = '/teacher';
				}
			}
			})
		}
	})
	
	// 原先的jquery中的ajax提交方式
	/*$('#addTeacher').on('submit', function () {
		// alert('提交');

		// 1、将数据提交到哪个接口？
		// 2、以何种方式提交(get/post)
		// 3、传递哪些参数

		// 获取表单数据
		var formData = $(this).serialize();
		var url = $(this).attr('action').trim();
		$.ajax({
			url: url,
			type: 'post',
			data: formData,
			success: function (info) {
				// alert(info.msg);//添加成功
				if(info.code == 10000) {
					// 如果与后台返回的状态码相等，那么就刷新当前页
					// location.reload();
					location.href = '/teacher';
				}
			}
		});
		
		// 阻止默认行为(默认的submit有一个提交的)
		return false;
	});*/

});