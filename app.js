var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// 设置模板引擎
// 指定模板引擎放在那里了？
app.set('views',__dirname+'/views');
// 指定使用哪个模板引擎
app.set('view engine','xtpl');

// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend:false}));

// 设置目录 ,加载静态资源
app.use('/',express.static('public'));
app.use('/',express.static('uploads'));

// 加载子路由
var index = require('./controllers/index');
var user = require('./controllers/user');
var teacher = require('./controllers/teacher');

// 挂载子路由
app.use('/',index);
// 访问/user是就是访问./controllers/user.js
app.use('/user',user);
app.use('/teacher',teacher);

// 监听端口
app.listen(3000);