/**
 * Created by Administrator on 2017/8/5.
 */
var fs = require('fs');
var http = require('http');

var config = fs.readFileSync('public/config/config.json', 'utf-8');
var configObj = JSON.parse(config);

var serverAddress = configObj.serverAddress;
var serverPort = configObj.serverPort;

var obj = {
	createServerImgPath: function(uuid){
		var path = 'http://'+ serverAddress + ':' + serverPort + '/api/live/device/'+ uuid + '/cached.png';
		return path;
		// var options = {
		// 	host: serverAddress,
		// 	port: serverPort,
		// 	method: 'GET',
		// 	path: '/api/live/device/'+ uuid + '/cached.png'
		// };
		// var imageData = "";
		// http.request(options, function(res){
		// 	res.on('data', function(data){
		// 		imageData += data;
		// 	});
		// });
		// console.log(imageData);
	},
	createClientImgPath: function(uuid){
		var path = 'http://'+ serverAddress + ':' + serverPort + '/api/live/device/'+ uuid + '/image.png';
		return path;
	}
};

module.exports = obj;