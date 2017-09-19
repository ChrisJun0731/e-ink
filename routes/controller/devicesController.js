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

router.get('/api/devicestatus/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardGetRequest();
});

router.post('/api/device/:uuid/reboot/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPostRequest();
});

router.post('/api/session/:uuid/restart/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPostRequest();
});

router.post('/api/session/:uuid/webkit-clear-cache/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPostRequest();
});

router.delete('/api/device/:uuid', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardDelRequest();
});

router.put('/api/device/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPutRequest();
});

router.put('/api/session/:uuid', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPutRequest();
});

module.exports = router;