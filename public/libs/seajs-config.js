// 配置
		seajs.config({
			base: '/assets',
			alias: {
				jquery: 'jquery/jquery.js',
				bootstrap: 'bootstrap/js/bootstrap.js'
			},
			// 实现全局的模块提前加载
			// 在使用use后才会执行
			// 但是提前于use
			preload:['/scripts/common','bootstrap']
		})
