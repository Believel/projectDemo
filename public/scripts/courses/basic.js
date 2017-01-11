define(function(require,exports,module){
	var $ = require('jquery');
	require('form')
	require('ckeditor');

   //使用在线编辑器插件
	CKEDITOR.replace( 'textEditor' );
	$('#basicCourse').on('submit',function(){
		// 提交ckeditor数据
		// 解释一下：富文本编辑器本身没有数据添加的功能，需要处理一下
		for(instance in CKEDITOR.instances){
			CKEDITOR.instances[instance].updateElement();
		}
		//提交表单
		$(this).ajaxSubmit({
			url:'/course/basic',
			type:'post',
			success:function(data){
			  alert(data.msg)
			  console.log(data.result.cs_id)
			  if(data.code===10000){
			  	location.href = '/course/picture/' + data.result.cs_id;
			  }

			}
		})
		return false;
	})
	
	// 获取子分类
	$('#topCategory').on('change',function(){
		var _this = $(this);
		$.ajax({
			url:'/course/getChild',
			type:'post',
			data:{cg_id:_this.val()},
			success:function(data){
				// console.log(data);
				var html = '';
				for(var i =0; i< data.result.length;i++){
					html+='<option value="'+data.result[i].cg_id+'">'+data.result[i].cg_name+'</option>'
				}
				_this.next('select').html(html)
				// _this.next('select').size();//选择多少次

			}

		})
	})

})