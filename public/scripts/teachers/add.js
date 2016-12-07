define(function (require, exports, module) {

	// 引入jquery文件
	var $ = require('jquery');

	// console.log($);
	
	$('#addTeacher').on('submit', function () {
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
	});

});