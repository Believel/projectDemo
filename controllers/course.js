 var express = require('express');

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
	res.render('courses/course_category_add')
}) 