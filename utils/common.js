
exports.getTree = getTree;

//改变json数据格式的方法 
//改变的样式
// {
//   cg_id:1,
//   cg_pid:0,
//   childs:[
//           {cg_id:5,
//            cg_pid:1
//           },
//           {cg_id:8,
//            cg_pid:1
//           },
//           ]
//           .......
// }
function getTree(data, pid) {

	var arr = [];
	var args = arguments;

	(function () {

        for(var i=0; i<data.length; i++) {
            if(data[i]['cg_pid'] == pid) {

                data[i].childs = [];

                if(args[2]) {
                    args[2].push(data[i]);
                } else {
                    arr.push(data[i]);
                }

                getTree(data, data[i]['cg_id'], data[i].childs);
            }
        }

	})()

	return arr;
}