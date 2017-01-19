var db = require('../config/db');

exports.add = function(body,callback){
	var ls_id = body.ls_id;

	delete body.ls_id;

	if(ls_id){

		var query = 'UPDATE `lesson` SET ? WHERE `ls_id`=' + ls_id;
	}else{
		var query = 'INSERT INTO `lesson` SET ?';
	}
	db.query(query, body, callback);
	// var sql = db.query(query, body, callback);
	// console.log(sql.sql);

}

//根据课程id显示所有的课时
exports.find = function(ls_cs_id,callback){
	var query = 'SELECT * FROM `lesson` WHERE `ls_cs_id` ='+ ls_cs_id;
	db.query(query,callback)

}
//根据课时id显示对应一条的课时
exports.show = function(ls_id, callback){
	var query = 'SELECT * FROM `lesson` WHERE `ls_id`=' + ls_id;
	db.query(query, callback);
}

