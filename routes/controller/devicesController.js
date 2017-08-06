/**
 * Created by Administrator on 2017/7/30.
 */
var express = require('express');
var router = express.Router();

var Proxy = require('../service/proxy');
var devicesService = require('../service/devicesService');

router.get('/api/device/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardGetRequest();
});

router.get('/api/session/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardGetRequest();
});

router.get('/api/live/device/', function(req, res){
	var uuid = req.query.id;
	var serverImgPath = devicesService.createServerImgPath(uuid);
	var clientImgPath = devicesService.createClientImgPath(uuid);
	res.send({
		serverImgPath: serverImgPath,
		clientImgPath: clientImgPath
	});
});

module.exports = router;