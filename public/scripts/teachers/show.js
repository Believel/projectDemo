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
})