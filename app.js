var express = require('express');
var bodyParser = require('body-parser');//中间件方法
var cookieParser = require('cookie-parser')//cookie的中间件
var session = require('express-session') // session的中间件
var app = express();

// 设置模板引擎
// 指定模板引擎放在那里了？
app.set('views',__dirname+'/views');
// 指定使用哪个模板引擎
app.set('view engine','xtpl');

// 应用cookie的中间件，此中间件就会在响应（res）的时候设置cookie方法
app.use(cookieParser());
// 应用session的中间件
// 在req中添加一个属性
app.use(session({
  secret: 'keyboard cat',
  resave: false,
}))
// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend:false}));

// 设置目录 ,加载静态资源
app.use('/',express.static('public'));
app.use('/',express.static('uploads'));

app.use(function(req, res, next){
	var url = req.originalUrl;
	// console.log(url);
	
	// app.locals.demo = '你好';
	// express提供了一个全局的对象，在这个对象下的数据在任何视图中都可以获得
	
	// 登录信息
	// 在这里读取存取的信息，也就是说在每一个页面都会输出这个信息
	// console.log(req.session);
	var loginfo = req.session.loginfo;
	app.locals.loginfo = loginfo; // 把获得的登录信息存放在全局的对象下面
	// // 判断如果没有存储loginfo的信息，返回的是undefined
	if(url !=='/login' && !loginfo){
		res.redirect('/login');
	}
	next();
});

// 加载子路由
var index = require('./controllers/index');
var user = require('./controllers/user');
var teacher = require('./controllers/teacher');
var login = require('./controllers/login');

// 挂载子路由
app.use('/',index);
// 访问/user是就是访问./controllers/user.js
app.use('/user',user);
app.use('/teacher',teacher);
app.use('/login',login);

// 监听端口
app.listen(3000);