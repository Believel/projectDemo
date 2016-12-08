define(function(require,exports,module){
	// 依赖bootstrap
	var $ = require('jquery');
	require('bootstrap');

	// 在teachers/index.xtpl中点击“查看”，显示模态框中的详细信息
	// 思路：给他的父元素table(#tacherList)绑定事件，让自身(.preview)去出发事件
	var teacherModal = $("#teacherModal")
	$("#teacherList").on('click', 'a.preview', function() {
		// 调用模态框让其显示出来
		teacherModal.modal();
		return false;
	});	

	// 实现注销功能
	// 思路：点击“注销”按钮，发送ajax请求,把当前的id号发送给后台，后台接收之后，
	// 修改字段tc_type=1,此时就注销掉了。
	$('#teacherList').on('click',"a.deleteInfo",function(){
		var id = $(".deleteInfo").data("index")
		console.log(id);
		$.ajax({
			url:'/teacher',
			type:'get',
			data:{},
			success:function(info){

			},
			error:function() {
				
			}
		})
		//阻止默认的行为
		return false;
	})
})