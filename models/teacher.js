// 处理teacher数据表的数据
var db = require('../config/db');

// 下一步通过db处理数据
exports.add = function(body, callback){
	// console.log('teacher模型被调用了')
	// body即表单的数据
	// 接下来执行数据库(插入操作)
	db.query('INSERT INTO `teacher` SET ?',body,callback);
};
exports.show = function(callback){
	console.log('show方法被调用了');
	db.query('SELECT * FROM `teacher`',callback);
}