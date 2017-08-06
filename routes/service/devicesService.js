/**
 * Created by Administrator on 2017/8/5.
 */
var fs = require('fs');

var config = fs.readFileSync('public/config/config.json', 'utf-8');
var configObj = JSON.parse(config);

var serverAddress = configObj.serverAddress;
var serverPort = configObj.serverPort;

var obj = {
	createServerImgPath: function(uuid){
		var path = 'http://'+ serverAddress + ':' + serverPort + '/api/live/device/'+ uuid + '/cached.png';
		return path;
	},
	createClientImgPath: function(uuid){
		var path = 'http://'+ serverAddress + ':' + serverPort + '/api/live/device/'+ uuid + '/image.png';
		return path;
	}
};

module.exports = obj;