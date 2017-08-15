/**
 * Created by Administrator on 2017/7/26.
 */
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var fs = require('fs');

var proxy = function(request, response){

    var config = fs.readFileSync('public/config/config.json', 'utf-8');
    var configObj = JSON.parse(config);
    this.host = configObj.serverAddress;
    this.port = configObj.serverPort;


    /**
     * 代理客户端的get请求，并将结果直接返回到客户端。
     * @param request express框架的request对象
     * @param response express框架的response对象
     */
    this.forwardGetRequest = function(){
        var headers = this.createHeader(request);
        var clientRequest = this.createRequest(request, headers);
        clientRequest.end();
        clientRequest.on('response', function(clientResponse){
            var data = '';
            clientResponse.on('data', function(chunk){
                data += chunk;
            });
            clientResponse.on('end', function(){
                response.send(data);
            });
        });
    };

    this.forwardDelRequest = function(){
		var headers = this.createHeader(request);
		var clientRequest = this.createRequest(request, headers);
		clientRequest.end();
		clientRequest.on('response', function(clientResponse){
		    response.send(clientResponse.statusCode);
        });
    };

    this.forwardPutRequest = function(){
        var headers = this.createHeader(request);
        var clientRequest = this.createRequest(request, headers);
        clientRequest.write(JSON.stringify(request.body));
        clientRequest.end();
        clientRequest.on('response', function(clientResponse){
            response.send(clientResponse.statusCode);
        });
    };

    this.forwardPostRequest = function(){
        var headers = this.createHeader(request);
        var clientRequest = this.createRequest(request, headers);
        if(Array.isArray(request.body)){
			var data = request.body;
			// ["1b003400-0d51-3333-3539-373500000000","32005300-1351-3433-3738-373100000000","32004100-1351-3433-3738-373100000000","2e003500-1351-3433-3738-373100000000"]
			// data = JSON.stringify(["1b003400-0d51-3333-3539-373500000000","32005300-1351-3433-3738-373100000000"]);
			clientRequest.write(data);
		}
		else{
			clientRequest.write(JSON.stringify(request.body));
		}
        clientRequest.end();
		clientRequest.on('response', function(clientResponse){
		    var data = '';
		    clientResponse.on('data', function(chunk){
                data += chunk;
            });
		    clientResponse.on('end', function(){
		        response.send(data);
            });
		});
    }


    /**
     * 根据客户端的请求，构建代理请求的header
     * @param request  客户端请求
     * @returns {{}} 代理请求的头对象
     */
    this.createHeader = function(request) {
        var apiKey = 'b3e156d1483f705c';
        var apiSecret = 'eYLjN5IVtDAN3yHP5BbjAGlQZt4ajRgUDQrLpjc4l/o';
        var date = Date().split('(')[0].slice(0,-1);
        var method = request.method;
        var path = this.createPath(request);
        var type = 'application/json';
        var auth = crypto.createHmac('sha256', apiSecret)
            .update(util.format('%s\n%s\n%s\n%s\n%s', method, '', type, date, path))
            .digest('base64');
		var headers = {"Content-Type": "application/json"};
        headers.Date = date;
        headers.Authorization = util.format('%s:%s', apiKey, auth);
        return headers;
    };

    /**
     * 创建Get代理请求对象
     * @param request 客户端请求
     * @param headers 代理请求的头信息
     * @returns {*} 代理请求对象
     */
    this.createRequest = function(request, headers){
        var path = this.createPathWithParam(request);
        var req = http.request({
            method: request.method,
            host: this.host,
            port: this.port,
            path: path,
            headers: headers
        });
        return req;
    };

	/**
     * 根据request请求，创建代理请求的路径
	 * @param request
	 */
	this.createPath = function(request){
		var path = request.url;
		if(request.query.id != null){
			path = request._parsedUrl.pathname + request.query.id;
		}
		return path;
    };

	this.createPathWithParam = function(request){
		var path = request.url;
		if(request.query.id != null){
			path = request._parsedUrl.pathname + request.query.id;
		}
		if(request.query.from != null & request.query.to != null){
			path += '?from=' + request.query.from + '&to=' + request.query.to;
		}
		return path;
	}
};

module.exports = proxy;







