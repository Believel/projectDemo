var express = require('express');
var router = express.Router();
module.exports = router;

// 这里的‘/‘是在用户管理模块中的默认显示的路由
router.get('/',function(req,res){
	res.render('teachers/index',{});
});
