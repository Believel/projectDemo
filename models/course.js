//处理course数据表中的数据
var db = require('../config/db');
//添加数据 
exports.add = function(body,callback){

	 db.query('INSERT INTO `course` SET ?',body,callback);

} 

//根据id查找课程信息
exports.find = function(cs_id,callback){
	var query = 'SELECT * FROM `course` WHERE `cs_id`='+cs_id;
	db.query(query,callback);
}
 
// 修改课程信息
exports.update = function(body,callback){
	var cs_id = body.cs_id;
	delete body.cs_id;
	var query = 'UPDATE `course` SET ? WHERE `cs_id` ='+ cs_id;
	db.query(query,body,callback)
}

exports.list = function(callback){
	// 可以通过连表查询将此课程下的讲师，分类，课时，用户
	// 	// mysql 知识不够，只查询课程信息
	var query = 'SELECT * FROM `course`';
	db.query(query, callback);
}