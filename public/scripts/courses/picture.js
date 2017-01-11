define(function(require, exports, module){
	var $ = require('jquery');
	require('form');
	require('uploadify');//引入文件上传插件
	require('Jcrop');//jquery的图片裁剪插件的引入
	var preview = $('.preview img');


	// 图片上传
	$('#upfile').uploadify({
		width: '85px',
		height: 'auto',
		fileObjName: 'upfile', // 上传文件的key，相当于file表单name
		formData: {cs_id: $('#csID').val()}, // 参数，相当于jquery的data
		buttonClass: 'btn btn-success btn-sm',//允许将覆盖的样式修改
		fileSizeLimit: '2MB',//限制上传的文件的大小
		fileTypeExts:  '*.gif; *.jpg; *.png',//上传文件格式的限制
		buttonText: '选择图片',//文本内容
		swf: '/assets/uploadify/uploadify.swf',//flash文件路径
		uploader: '/course/upfile',
		itemTemplate: '<span></span>',
		onUploadSuccess: function (file, data) {
			// console.log(data) //得到的是字符串
			var data = JSON.parse(data); // 转化为对象
			// 预览图片
			preview.attr('src', '/original/' + data.filename);	
		}
	});

})