//处理course数据表中的数据
var db = require('../config/db');
//添加数据
exports.add = function(body,callback){

	 db.query('INSERT INTO `course` SET ?',body,callback);

} 