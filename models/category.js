var db = require('../config/db')
//添加分类
exports.add = function(body,callback){
	db.query('INSERT INTO `category` SET ?',body,callback)
}
exports.update = function(body,callback){
	var cg_id = body.cg_id;
	console.log(cg_id);
	delete body.cg_id;
	var query = 'UPDATE `category` SET ? WHERE `cg_id` = '+ cg_id;
	db.query(query,body,callback)
}
// 显示顶级分类——/category/add
exports.show = function(callback){
	var query = 'SELECT * FROM `category` WHERE `cg_pid`= 0';
	db.query(query,callback)
} 
// 显示所有的分类列表——/category'
exports.list = function(callback){
	var query = 'SELECT * FROM `category`';
	db.query(query,callback)
}
// 编辑分类数据
exports.find = function(cg_id,callback){
	var query = 'SELECT * FROM `category` WHERE `cg_id` ='+cg_id;
	db.query(query,callback)
}
// 得到所有的顶级分类
exports.getParent = function(cs_cg_id,callback){

	var query = 'SELECT * FROM `category` WHERE `cg_pid`=0 UNION SELECT * FROM `category` WHERE `cg_pid`=(SELECT `cg_pid` FROM `category` WHERE `cg_id`=' + cs_cg_id + ')'; 
	db.query(query, callback);
}
// 得到子级分类
exports.getChild = function(cg_id, callback){
	var query = 'SELECT * FROM `category` WHERE `cg_pid`=' + cg_id;
	db.query(query, callback);
}