var express = require('express');
var router = express.Router();
// 讲师表
var tcModal = require('../models/teacher');
module.exports = router;

router.get('/',function(req,res){
	// 加载页面
	res.render('login/index',{});
});
router.post('/',function(req,res){
	var body = req.body;
	tcModal.authored(body,function(err,result){
		if(err) return;
		// console.log(result);
		// 成功之后要记住登录状态
		// 存取登录的信息，可以看作是全局的变量
		req.session.loginfo = result;
		res.json({
			code:10000,
			msg:'登录成功',
			reslut:{}
		})
	})
})