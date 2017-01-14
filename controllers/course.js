 var express = require('express');

 //加载分类数据模块
 var cgModel = require('../models/category') //课程分类数据表模型
 var csModel = require('../models/course') //课程数据表模型
 var tcModel = require('../models/teacher') //讲师数据表模型
 var lsModel = require('../models/lesson') //课时数据表模型
 
var common = require('../utils/common');//自己封装的改变json数据格式的方法
 

var path = require('path');

var rootPath = path.join(__dirname, '../');

// 上传文件
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, rootPath + 'uploads/original');
	},
	filename: function (req, file, cb) {

		var originalname = file.originalname;

		var fileName = originalname.slice(0, originalname.lastIndexOf('.'))
		var fileExt = originalname.slice(originalname.lastIndexOf('.'));

		cb(null, fileName + '-' + Date.now() + fileExt);
	}
})
 
var upload = multer({ storage: storage });
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
			cgModel.getParent(result[0]['cs_cg_id'],function(err,cats){
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
				cs_id:cs_id
			}
		});
	});
})
//在基本的课程信息中——获得子分类路由
router.post('/getChild',function(req,res){
	var cg_id = req.body.cg_id;

	cgModel.getChild(cg_id, function(err,result){
		if(err) return;
		res.json({
			code:10000,
			msg:'获取成功!',
			result:result
		})
	})
})
//添加封面图的路由——step2
router.get('/picture/:cs_id',function(req, res){
	// 获得课程的id
	var cs_id = req.params.cs_id;
	// console.log(cs_id);
	csModel.find(cs_id,function(err,result){
		if(err) return;
		//查询老师的姓名
		var tc_id = result[0]['cs_tc_id'];
		tcModel.find(tc_id,function(err, row){
			if(err) return;
			res.render('courses/picture',{course:result[0],teacher:row[0]});
		})
		
	})
	
})
// 上传文件——课程封面
router.post('/upfile', upload.single('upfile'), function (req, res) {

	// 将原始图片也要存入数据
	// 方便下次用户修改
	
	// console.log(req.file);
	// 字段数据
	var body = {
		cs_cover_original: req.file.filename,
		cs_id: req.body.cs_id
	}

	// 存入数据库
	csModel.update(body, function (err, result) {
		if(err) return;

		res.json(req.file);		
	});

});
//课程列表路由
router.get('/list',function(req,res){
	res.render('courses/course_list')
}) 
// 分类列表路由
router.get('/category',function(req,res){
	// 显示所有的分类列表
	cgModel.list(function(err,result){
		if(err) return;
		var tree = common.getTree(result,0);
		res.render('courses/course_category',{categorys:tree})
	})
	
}) 
router.get('/category/add',function(req,res){
	//按顶级取分类
	cgModel.show(function(err,result) {
		if(err) return;
		// console.log(result);//返回的是对应数据表中的查询数据对象-顶级分类
		res.render('courses/course_category_add',{categorys:result}) 
	});
	
}) 
router.post('/category/add',function(req,res){
	
	// console.log(req.body)
	cgModel.add(req.body,function(err,result){
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
	cgModel.update(req.body,function(err,result){
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
	cgModel.show(function(err,all) {
		if(err) return;

		cgModel.find(cg_id,function(err,child){
		if(err) return;
		res.render('courses/course_category_add',{categorys:all,child:child[0]}) 
	  });
	});
})

// 裁剪路由
router.post('/crop',function(req,res){
	// console.log(req.body);
	var x = req.body.x;
	var y= req.body.y;
	var w = req.body.w;
	var h = req.body.h;
	var filename = req.body.cs_cover_original;
	
	// 接收参数
	// 调用裁切工具
	// 将裁切好的图片存到数据库
	// 
	common.crop(x, y, w, h, filename,function(file){
		// 裁切完成后入库拼凑参数
		var body = {
			cs_cover: file,//新的图片名
			cs_id: req.body.cs_id
		}

		csModel.update(body,function(err, result){
			if(err) return;
			res.json({
				code:10000,
				msg:'裁切成功',
				result:{
					cs_id: req.body.cs_id //返回前台cs_id进行“课时”模块的完成
				}
			})
		})
		
		

	});

})
// 显示课时view
router.get('/lesson/:cs_id',function(req, res){
	// console.log(req.params.cs_id);//得到cs_id
	var data = {};
	var cs_id = req.params.cs_id;
	// 查询课程信息
	csModel.find(cs_id, function(err, result){
		if(err) return;
		data.course = result[0];
		var tc_id = result[0]['cs_tc_id'];
		// 查询讲师信息
		tcModel.find('tc_id',function(err, rows){

			if(err) return;
			data.teacher = rows[0];
			// 查询课时信息
			lsModel.find(cs_id, function(err, lessons){
				if(err) return;
				data.lesson = lessons;
				// console.log(lessons) //可能有多个数组对象
				//渲染课时模板
	          res.render('courses/lesson',data);
			})
		})
		

	})	
})
// 添加课时
router.post('/lesson',function(req, res){
	// console.log(req.body);
	var ls_minutes = req.body.ls_minutes;
	var ls_seconds = req.body.ls_seconds;
	req.body.ls_video_duration = ls_minutes + ':' + ls_seconds;

	delete req.body.ls_minutes;
	delete req.body.ls_seconds;

	lsModel.add(req.body, function(err, result){
		if(err) return;
		res.json({
			code:10000,
			msg:'添加课时成功',
			result:{}
		})
 	})

})