var express = require('express');
// 子路由
var router = express.Router();
// 导出
module.exports = router;
// 设置路由
router.get('/',function(req,res){
	// res.send('hello nodejs');
	res.render('dashboard/index',{name:'itcast'});
});
//个人设置
router.get('/settings',function(res,req){
	res.render('dashboard/settings',{})
})
