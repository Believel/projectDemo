var mysql      = require('mysql');
// 连接数据库
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '143720',
  database : 'studyit',
  port     : '3309'
});
module.exports = connection;
