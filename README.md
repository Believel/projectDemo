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
### 3、项目结构再处理
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

    * 这里的“编辑分类”的页面和“添加分类”的页面是同一个，所以要分别处理表单提交的内容
    * 技巧：是在表单没设置一个隐藏域,判断是编辑页面还是添加页面
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

   * 处理course 、teacher、category中的联系问题

 - 5)课程图片模块

   * 处理文件上传，显示预览图片
     * 使用前端的uploadify插件,node中的multer工具 

   * 处理图片裁剪功能
     * 使用前端的Jcrop插件,实现裁剪功能,记住裁剪的位置，大小，存储在后台,利用node中的gm工具处理实现，但是现在有一个问题就是：裁切之后的新图片不能保存在指定的文件件中，但是原始的能保存，我知道是gm工具的报错的问题，但是还没解决。。。。。。
 - 6)课程课时模块
   * 添加课时
     * 调用bootstrap中的模态框，处理表单数据，添加完成之后利用前端的模板引擎将新数据追加在前端上。
   * 编辑课时
     * 本次编辑模块采用的在后端处理是"编辑"或者是"添加"，根据添加一个隐藏域"ls_id",如果是编辑的话ls_id是有值的，若是添加的话ls_id是空的，根据这样在数据库中处理的"查询"还是"修改"操作
     * 但是前端因为涉及DOM的追加操作，所以要解决是"追加"还是"替换"的问题,我解决的方案是：利用在"编辑"按钮上添加一个data-key标识，或者当前li的索引值，如果data-key有值的话就"替换"当前的内容为新的内容，否则就直接append

### 7.项目的自动化构建
  利用自动化工具gulp,定义idleading,合并,压缩,构建包等,并结合seajs处理路径的一些问题。

### 遇到的问题：

自己觉得挺麻烦的，折腾自己的问题记录。
-  1.课程分类中不同级别的类型排列显示在各自的位置中。
-  2.裁切图片的处理问题。
-  3.不同表之间的关联问题。


