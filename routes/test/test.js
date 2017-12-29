/**
 * Created by Administrator on 2017/7/27.
 */
var http = require('http');
var crypto = require('crypto');
var util = require('util');

var headers = {};

var apiKey = 'b3e156d1483f705c';
var apiSecret = 'eYLjN5IVtDAN3yHP5BbjAGlQZt4ajRgUDQrLpjc4l/o';
var date = 'Fri, 18 Jul 2014 08:57:09 GMT';
var method = 'GET';
var path = '/api/device/';

var auth = crypto.createHmac('sha256', apiSecret)
    .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', '', date, path))
    .digest('base64');

headers.Date = date;
headers.Authorization = util.format('%s:%s',apiKey, auth);
headers.Content_Type = 'application/json';

var options = {
    method: 'get',
    host: '192.168.30.215',
    port: 8081,
    path: '/api/device',
    headers: headers
};

var req = http.request(options, function(res){
    var data = '';
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function(){
        console.log(data);
    })
});

req.end();


