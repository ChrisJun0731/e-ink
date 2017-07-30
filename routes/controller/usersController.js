/**
 * Created by Administrator on 2017/7/30.
 */
var express = require('express');
var router = express.Router();

var Proxy = require('../service/proxy');

router.get('/api/user/', function(req, res){
	var proxy = new Proxy(req, res);
	proxy.setHost('192.168.0.101');
	proxy.setPort(8081);
	proxy.forwardGetRequest();
});

module.exports= router;