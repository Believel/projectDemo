define("/dist/login/index",["jquery","form"],function(n,i,o){var e=n("jquery");n("form"),e("#login").on("submit",function(){return e(this).ajaxSubmit({url:"/login",type:"post",success:function(n){1e4===n.code&&(location.href="/")}}),!1})});