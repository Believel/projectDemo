### 1、 基本页面布局
	
    a) CSS命名空间（避免样式冲突）

    .index .logo {
    	....
    }

    .main .logo {
    	....
    }

    称.index 和 .main 就是命名空间
### 2、 项目部署

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
### 3、
   - 1) 优化项目结构
   - 2) 前端模块代码划分目录
   - 3) seajs设置预加载
### 4、讲师管理模块
   - 1) 表单验证
      * 实现前端form表单提交处理
   - 2) 日期插件
   - 3) 前端模板引擎(artTemplate)
   - 4) 进度条插件
### 5、个人资料模块
   - 1) 个人资料完善 
     * 实现上传头像
     * 实现省市县功能
     * 实现富文本编辑和处理功能
   - 2) 登录功能
     * 处理会话功能,前端cookie和后端session的配合实现
   - 3) 修改密码
### 6、课程管理模块
  - 1) 添加分类信息
     * 处理级别问题
  - 2) 显示分类信息
     * 处理如何正确显示表信息
  - 3)编辑分类
  - 这里的“编辑分类”的页面和“添加分类”的页面是同一个，所以要分别处理表单提交的内容
  - 技巧：是在表单没设置一个隐藏域,判断是编辑页面还是添加页面
```js
  {{#if (child.cg_id)}}
        <input type="hidden" name="cg_id" value="{{child.cg_id}}">
  {{/if}}
```
-然后在利用jquery方法分别获得编辑页面和添加页面的地址

```js
//html代码
<form id="addCategory" action="{{#if (child.cg_id)}}/course/category/update{{else}}/course/category/add{{/if}}" class="form-horizontal">
</form>
//js代码
var url = $(this).attr('action').trim();
```
 - 4)课程添加模块
   *　处理course 、teacher、category中的联系问题


