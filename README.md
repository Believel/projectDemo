1、 基本页面布局
	
    a) CSS命名空间（避免样式冲突）

    .index .logo {
    	....
    }

    .main .logo {
    	....
    }

    称.index 和 .main 就是命名空间
2、 项目部署

    a) 前后端分离

    1) V + C 前端 taobao.com  M = 后端 api.taobao.com

    2) C 靠JS、CSS、HTML 是不能实现的

    3) 为了实现C前端团队需要依赖于一个后端语言Nodejs、PHP、Python

    4) C 可以实现加载任意V，在V里通过XMLHttpRequest发送请求向，

   	   索取数据

   	5) 前后端分离可以实现前后端完全解藕，使得后端数据更加稳定统一

   	6) 可能会引起跨域问题，JSONP解决

   	------------------------------

    b) 前后端不分离

    1) V = 前端  C + M = 后端