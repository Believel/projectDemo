var express = require('express');
// 子路由
var router = express.Router();
// 导出
module.exports = router;
// 设置路由
router.get('/',function(req,res){
	// res.send('hello nodejs');
	res.render('dashboard/index',{name:'itcast'});
	
	// 随意测试cookie和sesson
	// res.cookie('age',22);
	// req.session.name = '张盼盼';
	// console.log(req);

});
//个人设置
router.get('/settings',function(req,res){
	res.render('dashboard/settings',{})
})
// 更改密码
router.get('/repass',function(req,res){
	res.render('dashboard/repass',{})
})
