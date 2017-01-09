define(function(require,exports,module){
	var $ = require('jquery');
	require('form')

	$('#addCourse').on('submit',function(){
		$(this).ajaxSubmit({
			url:'/course/add',
			type:'post',
			success:function(data){
			  alert(data.msg)
			  if(data.code===10000){
			  	location.href = '/course/basic/' + data.result.insertId;
			  }

			}
		})
		return false;
	})

})