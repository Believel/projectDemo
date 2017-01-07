var db = require('../config/db')
//添加分类
exports.add = function(body,callback){
	db.query('INSERT INTO `category` SET ?',body,callback)
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
