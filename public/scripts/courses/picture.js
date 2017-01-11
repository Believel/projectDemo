define(function(require, exports, module){
	var $ = require('jquery');
	require('form');
	require('uploadify');//引入文件上传插件
	require('Jcrop');//jquery的图片裁剪插件的引入
	var preview = $('.preview img');

 
 	function imgJcrop(){
 		//调用裁剪插件方法
 		preview.Jcrop({
				boxWidth: 400, //最大盒子的宽度
				aspectRatio: 2 //限制宽高的比例关系	
			},function(){
				// console.log(this);
				var height = this.ui.stage.height; //图片的高度
				var width = this.ui.stage.width; // 图片的宽度
				var x, y, w, h;
				x = 0;
				w = width;
				y = (height - width/2)/2;
				h = width/2;

				//插件实例化之后会调用回调函数，因此可以在回调函数中设置默认的情况，比如是提前选取就显示出来
				this.newSelection();//声明设置选区
				this.setSelect([x, y, w, h]);//设置选区，前两个参数是左上角坐标值，后两个参数是宽度和高度

			});
 	}

 	// 给图片的父元素添加事件  cropmove cropend
 	preview.parent().on('cropmove cropend',function(selection, coords, c){

 		//拿到裁剪的位置值
 		$('#x').val(c.x);
 		$('#y').val(c.y);
 		$('#w').val(c.w);
 		$('#h').val(c.h);
 	})
 	// 点击裁剪图片的按钮，提交表单（x,y,w,h）到后台
 	$('#cutBtn').on('click',function(){
 		// 按钮有两种功能，一是调用选区，二是提交数据到后台
 		var status = $(this).attr('data-status');
 		if(status === 'cut'){
 			//点击裁剪按钮的时候，调用裁剪选区方法
 		    imgJcrop();
 		    $(this).val('保存图片');
 		    $(this).attr('data-status', 'save');
			return;
 		}
 		
 		$('#coordsForm').ajaxSubmit({
 			url:'/course/crop',
 			type:'post',
 			success:function(data){
 				alert(data.msg)
 				if(data.code === 10000){
 					location.href = '/course/lesson/' + data.result.cs_id;
 				}
 			}

 		})
 		return false;


 	})
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
			// 图片上传成功之后,将图片的名字存入表单中
			$('#cover').val(data.filename);

			//图片上传成功之后，改变裁剪按钮的状态
			$('#cutBtn').prop('disabled',false);
			$('#cutBtn').val('保存图片').attr('data-status', 'save');

			// 裁剪图片函数调用
			imgJcrop();
			
		}
	});

})