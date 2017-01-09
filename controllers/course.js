 var express = require('express');

 //加载分类数据模块
 var cgModal = require('../models/category') //课程分类数据表
 var csModel = require('../models/course') //课程数据表
 var tcModel = require('../models/teacher') //讲师数据表
var common = require('../utils/common');//自己封装的改变json数据格式的方法
 // 引入创建子路由的中间件
var router = express.Router();

//暴露路由出去
module.exports = router;

// 设计路由
router.get('/add',function(req,res){
	res.render('courses/course_add')
}) 
router.post('/add',function(req,res){
	csModel.add(req.body,function(err,result){
		if(err) return;
		res.json({
			code:10000,
			msg:'添加成功',
			result:{
				insertId:result.insertId //获得添加成功之后的id值，方便下一步进行修改操作
			}
		})

	})

})
// 添加课程基本信息——step1
router.get('/basic/:cs_id',function(req,res){
	// 查出当前课程的信息
	var cs_id = req.params.cs_id; //当前的课程的id
	var data = {};//定义一个存储数据的对象
	//查找所有讲师的信息
	csModel.find(cs_id,function(err,result){
		if(err) return;
		data.course = result[0];//课程信息
		tcModel.show(function(err,rows) {
			if(err) return;
			data.teachers = rows;//所有讲师的信息
			//查找分类的信息(顶级分类 + 子集分类)
			cgModal.getParent(result[0]['cs_cg_id'],function(err,cats){
					if(err) return;
					// console.log(cats)//课程属于分类（既有顶级又有子级分类）
					var parents = [],
					    childs = [];
					for(var i=0; i<cats.length; i++) {
					if(cats[i]['cg_pid'] == 0) {
						parents.push(cats[i]);
						continue;
					}
					childs.push(cats[i]);
				}

				var category = {
					parents: parents,
					childs: childs
				}
				// 处理分类数据
				data.category = category;
				res.render('courses/basic',data);

			})

			
		
		});
		

	})
	

})
//提交课程基本信息路由
router.post('/basic',function(req,res){
		var cs_id = req.body.cs_id;
	csModel.update(req.body, function (err, result) {
		if(err) console.log(err);

		res.json({
			code: 10000,
			msg: '添加成功',
			result: {
				cs_id: cs_id
			}
		});
	});
})
//添加封面图的路由——step2
router.get('/picture/:cs_id',function(req,res){
	res.render('courses/picture');
})
//课程列表路由
router.get('/list',function(req,res){
	res.render('courses/course_list')
}) 
// 分类列表路由
router.get('/category',function(req,res){
	// 显示所有的分类列表
	cgModal.list(function(err,result){
		if(err) return;
		var tree = common.getTree(result,0);
		res.render('courses/course_category',{categorys:tree})
	})
	
}) 
router.get('/category/add',function(req,res){
	//按顶级取分类
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
router.post('/category/update',function(req,res){
	
	console.log(req.body.cg_id)
	cgModal.update(req.body,function(err,result){
		if(err) return;
		//返回信息给前端
		res.json({
			code:10000,
			msg:'修改成功',
			result:{}
		})
	})
})
//编辑模块的路由
router.get('/category/edit/:cg_id',function(req,res){
	// console.log(req.params);//打印的是传入的参数，这里是cg_id

	var cg_id = req.params.cg_id;
	//编辑分类
	cgModal.show(function(err,all) {
		if(err) return;

		cgModal.find(cg_id,function(err,child){
		if(err) return;
		res.render('courses/course_category_add',{categorys:all,child:child[0]}) 
	  });
	});
})