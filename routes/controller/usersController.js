/**
 * Created by Administrator on 2017/7/30.
 */
var express = require('express');
var router = express.Router();

var Proxy = require('../service/proxy');

router.get('/api/user/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardGetRequest();
});

router.put('/api/user/:username', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPutRequest();
});

router.post('/api/user/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardPostRequest();
});

router.delete('/api/user/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.forwardDelRequest();
})

module.exports= router;