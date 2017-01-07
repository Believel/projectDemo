 var express = require('express');

 //加载分类数据模块
 var cgModal = require('../models/category')

 // 引入创建子路由的中间件
var router = express.Router();

//暴露路由出去
module.exports = router;

// 设计路由
router.get('/add',function(req,res){
	res.render('courses/course_add')
}) 
router.get('/list',function(req,res){
	res.render('courses/course_list')
}) 
router.get('/category',function(req,res){
	res.render('courses/course_category')
}) 
router.get('/category/add',function(req,res){
	//取分类
	cgModal.show(function(err,result) {
		if(err) return;
		// console.log(result);//返回的是对应数据表中的查询数据对象-顶级分类
		res.render('courses/course_category_add',{categorys:result}) 
	});
	
}) 
router.post('/category/add',function(req,res){
	
	// console.log(req.body)
	cgModal.add(req.body,function(err,result){
		if(err) return;
		//返回信息给前端
		res.json({
			code:10000,
			msg:'添加成功',
			result:''
		})
	})
})