var express = require('express');
var tcModal = require('../models/teacher');
var region = require('../models/region.json');

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
	// 根据用户登陆信息再次查询结果
	var tc_id = req.session.loginfo.tc_id;
	// console.log(tc_id);
	tcModal.find(tc_id,function(err,result){
		if(err)return;
		res.render('dashboard/settings',{teacher:result[0]});
	})
	
})
router.post('/update',function(req,res){
	var body = req.body;
	// res.send('收数据了');//返回前端信息
	tcModal.edit(body,function(err, result){
		if(err) console.log(err);
		res.json({
			code:10000,
			msg:'更新成功',
			result:{}
		})
	})

})
// 更改密码
router.get('/repass',function(req, res){
	res.render('dashboard/repass',{})
})
// 省市县
router.get('/region',function(req, res){
	// res.send('请求地区');
	res.json(region);
})