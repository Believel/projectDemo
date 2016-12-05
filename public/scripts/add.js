define(function (require, exports, module) {

	var $ = require('jquery');

	// console.log($);
	
	$('#addTeacher').on('submit', function () {
		// alert('提交');

		// 1、将数据提交到哪个接口？
		// 2、以何种方式提交(get/post)
		// 3、传递哪些参数

		// 获取表单数据
		var formData = $(this).serialize();

		$.ajax({
			url: '/teacher/add',
			type: 'post',
			data: formData,
			success: function (info) {

				alert(info.msg);

				if(info.code == 10000) {
					location.reload();
				}

			}
		});
		
		// 阻止默认行为
		return false;
	});

});