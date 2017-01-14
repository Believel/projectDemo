define(function(require, exports, module){

	var $ = require('jquery');
	require('form');
	var template = require('arttemplate');//调用模板引擎
	var lessonModal = $('#lessonModal');
	var item = $('#item');//列表内容ul
	var total = $('#total');//总课时
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
		var key = $(this).attr('data-key');
		var lsName = $('[name="ls_name"]').val();
		var lsMinutes = $('[name="ls_minutes"]').val();
		var lsSeconds = $('[name="ls_seconds"]').val();
		var size = item.children().size() + 1;

		$(this).ajaxSubmit({

			url:'/course/lesson',
			type:'post',
			success:function(data){
				// 添加成功之后需要展示新数据
				var info = {
					index: size,
					lsName: lsName,
					lsDuration: lsMinutes + ':' + lsSeconds
				}
				// 调用模板
				var html = template('lessonListTpl',info);
				// 追加DOM
				item.append(html);

				//总课时
				total.text('课时 : ' + size);

				//添加成功之后让模态框消失
				lessonModal.modal('hide');
			}
		})

		return false;

	})
})