define(function(require,exports,module){
	var $ = require('jquery');
	require('form')
	$('#addCategory').on('submit',function(){
		$(this).ajaxSubmit({
			url:'/course/category/add',
			type:'post',
			success:function(data){
				if(data.code===10000){
					location.reload();
					alert(data.msg);
				}
			}
		})
		return false;
	})

})

