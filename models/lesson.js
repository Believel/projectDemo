var db = require('../config/db');

exports.add = function(body,callback){

	var query = 'INSERT INTO `lesson` SET ?';
	db.query(query, body, callback);

}