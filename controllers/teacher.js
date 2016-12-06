var express = require('express');

// 引入讲师数据模型
var tcModel = require('../models/teacher');
var router = express.Router();
module.exports = router;

// 这里的‘/‘是在用户管理模块中的默认显示的路由
// 展示讲师
router.get('/',function(req,res){
	tcModel.show(function(err,result){
		if(err) return;
		// console.log(result);//数组对象，后台返回的数据库里面的数据
		res.render('teachers/index',{teachers:result});
	});
});
router.get('/add',function(req,res){
	res.render('teachers/add',{});
});
// 添加讲师
router.post('/add',function(req,res){
	// 从前端拿到传过来的数据
	// console.log(req.body)
	var body = req.body;
	// 调用model进行数据存储
	tcModel.add(body,function(err,result){
		if(err) return;

		// 如果传入后台的数据成功之后，就要告诉前端成功的信息
		console.log('res');
		res.json({
			code:'10000',
			msg:'添加成功',
			result:{}
		});
	});
})
