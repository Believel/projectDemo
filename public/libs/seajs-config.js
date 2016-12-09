// 配置
		seajs.config({
			base: '/assets',
			alias: {
				  jquery: 'jquery/jquery.js',
				validate:'jquery-validate/jquery-validate.js',//表单验证插件
					form:'jquery-form/jquery.form.js',// ajax提交表单的插件
				bootstrap: 'bootstrap/js/bootstrap.js',
				nprogress:'nprogress/nprogress.js',//进度条插件
				datepicker:'bootstrap-datepicker/js/bootstrap-datepicker.js',//日历插件
				language:'bootstrap-datepicker/js/bootstrap-datepicker.zh-CN.min.js',// 日历插件中文显示
				arttemplate:'artTemplate/template-native.js',//前端的模板引擎
				ckeditor:'ckeditor/ckeditor.js',//编辑器插件
				region:'jquery-region/jquery.region.js'//省级联动插件
			},
			// 实现全局的模块提前加载
			// 在使用use后才会执行
			// 但是提前于use
			preload:['/scripts/common','bootstrap']
		})
