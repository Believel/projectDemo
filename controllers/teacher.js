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
// 添加模块路由
router.get('/add',function(req,res){
	res.render('teachers/add',{});
});
// “编辑”讲师路由
router.get('/edit/:tc_id',function(req,res){
	// 拿到讲师对应的id号
	var tc_id = req.params.tc_id;
	// 调用模型查询对应讲师信息
	tcModel.find(tc_id,function(err,result){
		if(err) return;
		res.render('teachers/add',{teacher:result[0]});
	})
	
});
// “添加”讲师
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
// “编辑”讲师
router.post('/edit',function(req,res){
	// 拿前端发送的数据
	console.log(req.body)
	// 将修改过的数据传至数据库中
	tcModel.edit(req.body,function(err,result){
		if(err) return;
		res.json({
			code:10000,
			msg:'修改成功',
			result:{}
		})
	})
})
//"查看"讲师信息l
router.post('/preview',function(req,res){
	//接收前端传过来的讲师id
	//利用id查询
	// console.log(req.body.id);
	// console.log("前端数据过来了");
	tcModel.find(req.body.id,function(err,result){
		if(err)return;
		// 后台的数据返回给前端
		res.json(result[0]);
	})

})