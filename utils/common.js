var fs = require('fs');
var gm = require('gm');
var path = require('path');

var rootPath = path.join(__dirname, '../');
console.log(rootPath);

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


exports.crop = function (x, y, w, h, filename, callback) {

    // 将裁切后的图片进存储时，需要明确后缀
    var fileExt = filename.slice(filename.lastIndexOf('.'));
    var fileName = Date.now();
    var path = rootPath + '/uploads/thumbs/' + fileName + fileExt;

    // 
    gm(rootPath + '/uploads/original' +filename)
    .crop(w, h, x, y)
    .write(path, function (err) {
        if(!err)
        {
           console.log('done'); 
        }else{
            console.log(err)
        }
        

        callback(fileName + fileExt);
    });

}