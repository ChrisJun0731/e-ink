/**
 * Created by Administrator on 2017/8/28.
 */

var express = require('express');
var fs = require('fs');
var app = express();


// var readStream = fs.createReadStream('public/temp/需求文档.txt');
// console.log(readStream);
// console.log(readStream.byteLength);

app.use('/download', function(req, res){
	// var data = fs.readFileSync('../../public/temp/大数据出行宣传单页.pdf');
	// console.log(data);
	res.set('Content-Type', 'application/octet-stream');
	res.set('Content-Disposition', 'attachment; filename=1.pdf');
	// res.set('Content-Length', data.length);
	// res.send(data);
	fs.createReadStream('../../public/temp/大数据出行宣传单页.pdf').pipe(res);
});

app.listen(5000);
