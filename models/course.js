//处理course数据表中的数据
var db = require('../config/db');
//展示数据
exports.show = function(callback){
	console.log('哈哈哈');
	db.query('SELECT * FROM `course` SET ?',callback)
} 