var express = require('express');
var router = express.Router();
module.exports = router;
router.get('',function(req,res){
	// 加载页面
	res.render('login/index',{});
})