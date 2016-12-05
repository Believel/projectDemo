define(function (require, exports, module) {

	var $ = require('jquery');

	// 导航菜单
	$('.navs a').on('click', function () {

		var _this = $(this);

		// 链接
		if(_this.attr('href') != 'javascript:;') {
			return;
		}
		// 展开/收缩
		_this.next('ul').slideToggle();

	});

	// 设置选中状态
	$('.navs a').each(function () {

		var _this = $(this),
			href = _this.attr('href').slice(1),
			// 获取地址信息
			pathname = location.pathname;

		if(pathname.lastIndexOf(href) == 1) {
			// 添加选中状态
			_this.addClass('active');
			_this.next('ul').show();

			return false;
		}

	});

});