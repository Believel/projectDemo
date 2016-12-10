var express = require('express');
var tcModal = require('../models/teacher');
var region = require('../models/region.json');

var path = require('path');
// console.log(__dirname);//E:\www\project\day2\projectDemo\controllers
var rootPath = path.join(__dirname,'../');

var multer  = require('multer') // nodejs的中间件，用于处理 multipart/form-data 类型的表单数据, 它主要用于上传文件. 
// 允许处理上传文件的路径和文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootPath+'/uploads/avatars');
  },
  filename: function (req, file, cb) {
  	// console.log(file);//{ fieldname: 'tc_avatar',
					    //	  originalname: 'b.png',
					   //	  encoding: '7bit',
					  //	  mimetype: 'application/octet-stream' }
	var originalname = file.originalname;
	var lastIndex = originalname.lastIndexOf('.');
	var filename = originalname.slice(0, lastIndex);//b
	var fileExt = originalname.slice(lastIndex);//.jpg

  	// 原始名 + Date.now() + 原始后缀
    cb(null, filename + '-' + Date.now()+fileExt)
  }
})
var upload = multer({ storage: storage });
// var upload = multer({ dest: rootPath + '/uploads' })
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
// 上传头像
// 注意这里的第二个参数的参数信息给自己上传的文件的名字是一样的
router.post('/upfile', upload.single('tc_avatar'),function(req, res){
	// console.log(req.file);//E:\\www\\project\\day2\\projectDemo\\uploads\\2afd4f3d44d3f0b948cfacc8859043f5  注意此时上传的文件是没有后缀名的
	// res.send('上传头像')
	
	var body = {
		tc_id: req.session.loginfo.tc_id,
		tc_avatar: req.file.filename
	};
	tcModal.edit(body,function(err, result){
		if(err) return;
		res.json(req.file);
	})
	
})