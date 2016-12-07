// 处理teacher数据表的数据
var db = require('../config/db');

// 下一步通过db处理数据
// 添加数据
exports.add = function(body, callback){
	// console.log('teacher模型被调用了')
	// body即表单的数据
	// 接下来执行数据库(插入操作)
	db.query('INSERT INTO `teacher` SET ?',body,callback);
};
// 展示数据
exports.show = function(callback){
	// console.log('show方法被调用了');
	db.query('SELECT * FROM `teacher`',callback);
};
// 修改讲师信息
exports.edit = function(body, callback){
	//组件是不允许更改的
	var tc_id = body.tc_id;
	delete tc_id;
	var query = 'UPDATE `teacher` SET ? WHERE `tc_id` ='+tc_id;
	db.query(query, body, callback);
	
}
// 查询单个讲师
exports.find = function(tc_id,callback){
	// 根据讲师id查询
	var queryStr = 'SELECT * FROM `teacher` WHERE tc_id ='+tc_id;
	db.query(queryStr,callback);
};