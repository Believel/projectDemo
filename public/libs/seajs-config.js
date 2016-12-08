// 配置
		seajs.config({
			base: '/assets',
			alias: {
				  jquery: 'jquery/jquery.js',
				validate:'jquery-validate/jquery-validate.js',//表单验证插件
					form:'jquery-form/jquery.form.js',// ajax提交表单的插件
				bootstrap: 'bootstrap/js/bootstrap.js'
			},
			// 实现全局的模块提前加载
			// 在使用use后才会执行
			// 但是提前于use
			preload:['/scripts/common','bootstrap']
		})
