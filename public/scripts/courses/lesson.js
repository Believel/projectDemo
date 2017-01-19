define(function(require, exports, module){

	var $ = require('jquery');
	require('form');
	var template = require('arttemplate');//调用模板引擎
	var lessonModal = $('#lessonModal');
	var item = $('#item');//列表内容ul
	var total = $('#total');//总课时
	var save = $('#save');
	$('#addLesson').on('click',function(){
		var html = template('lessonTpl',{});

		//将表单元素追加
		lessonModal.find('form').html(html);

		// //保存按钮
		// save.attr('data-status','add');


		//调用模态框方法
		lessonModal.modal();


		return false;
	})
	//模态框内的表单提交
	// 利用HTMl5中新属性form属性实现表单提交
	$('#AddLesson').on('submit',function(){

		var key = $(this).attr('data-key');//获得保存按钮的按钮状态


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

				// 判断要不要追加？
				// 
				if(!key){
					// 追加DOM
					item.append(html);
				}else{
					//替换
					item.find('li').eq(key).find('span.name').text(lsName);
					item.find('li').eq(key).find('span.duration').text(lsMinutes + ':' + lsSeconds);
					
				}
				

				//总课时
				total.text('课时 : ' + size);

				//添加成功之后让模态框消失
				lessonModal.modal('hide');
			}
		})

		return false;

	})

	//因为涉及到dom操作，需要事件委托，绑定事件在其父元素上
	item.on('click','.btn',function(){
		var _this = $(this);
		var ls_id = _this.parents('li').attr("data-id");
		var key = _this.parents('li').index();
		if(_this.is('.edit')){

			//改变按钮标识
			save.attr('data-key',key);
			//找到当前元素的祖先元素的前一个同辈元素
			// var prev = _this.parents('li').prev();


			//当点击“编辑”时
			$.ajax({
				url:'/course/lesson/edit',
				data:{ls_id: ls_id},
				type:'post',
				success:function(data){
					// console.log(data);
					//时长要做处理
					var ls_minutes = data.ls_video_duration.split(':')[0];
					var ls_seconds = data.ls_video_duration.split(':')[1];

					data.ls_minutes = ls_minutes;
					data.ls_seconds = ls_seconds;

					//模板字符串
					var html = template('lessonTpl',data);

					//将表单元素追加
					lessonModal.find('form').html(html);
					//显示编辑模块的模态框
					lessonModal.modal();


				}
			})

		}
		if(_this.is('.preview')){
			alert("预览");

		}
		if(_this.is('.delete')){
			alert("删除");

		}

	})
})