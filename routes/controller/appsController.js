/**
 * Created by Administrator on 2017/7/31.
 */
var express = require('express');
var router = express.Router();
var Proxy = require('../service/proxy');

router.get('/api/app', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardGetRequest();
});

router.delete('/api/app', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardDelRequest();
});

router.put('/api/app/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPutRequest();
});

router.post('/api/app/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPostRequest();
});

module.exports = router;