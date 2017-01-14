define(function(require, exports, module){

	var $ = require('jquery');
	require('form');
	var template = require('arttemplate');//调用模板引擎
	var lessonModal = $('#lessonModal');
	$('#addLesson').on('click',function(){
		var html = template('lessonTpl',{});

		//将表单元素追加
		lessonModal.find('form').html(html);

		//调用模态框方法
		lessonModal.modal();


		return false;
	})
	//模态框内的表单提交
	// 利用HTMl5中新属性form属性实现表单提交
	$('#AddLesson').on('submit',function(){
		$(this).ajaxSubmit({

			url:'/course/lesson',
			type:'post',
			success:function(data){
				//添加成功之后让模态框消失
				lessonModal.modal('hide');
			}
		})

		return false;

	})
})