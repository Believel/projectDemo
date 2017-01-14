var db = require('../config/db');

exports.add = function(body,callback){

	var query = 'INSERT INTO `lesson` SET ?';
	db.query(query, body, callback);

}

//根据课程id显示所有的课时
exports.find = function(ls_cs_id,callback){
	var query = 'SELECT * FROM `lesson` WHERE `ls_cs_id` ='+ ls_cs_id;
	db.query(query,callback)

}