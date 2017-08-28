/**
 * Created by Administrator on 2017/7/25.
 */
define(['app'], function(app){
	return[app.factory('DevicesService', function($http){
		var devicesService = {
			getDevices: function(){
				var promise = $http.get('/api/device/').then(function(response){
					return response;
				});
				return promise;
			},
			getSession: function(config){
				var promise = $http.get('/api/session/', config).then(function(response){
					return response;
				});
				return promise;
			},
			getImages: function(config){
				var promise = $http.get('/api/live/device/', config).then(function(response){
					return response;
				});
				return promise;
			},
			getDeviceStatus: function(config){
				var promise = $http.get('/api/devicestatus/', config).then(function(response){
					return response;
				});
				return promise;
			},
			deleteDevice: function(config){
				var promise = $http.delete('/api/device/', config).then(function(response){
					return response;
				});
				return promise;
			},
			rebootDevice: function(uuid){
				var url = '/api/device/'+ uuid + '/reboot';
				var promise = $http.post(url).then(function(response){
					return response;
				});
				return promise;
			},
			restartSession: function(uuid){
				var url = '/api/session/'+ uuid + '/restart';
				var promise = $http.post(url).then(function(response){
					return response;
				});
				return promise;
			},
			clearWebCache: function(uuid){
				var url = '/api/session/'+ uuid + '/webkit-clear-cache';
				var promise = $http.post(url).then(function(response){
					return response;
				});
				return promise;
			},
			deleteDevice: function(uuid){
				var url = '/api/device/'+ uuid;
				var promise = $http.delete(url).then(function(response){
					return response;
				});
				return promise;
			},
			saveDevice: function(data, config){
				var promise = $http.put('/api/device/', data, config).then(function(response){
					return response;
				});
				return promise;
			},
			saveSession: function(data, config){
				var promise = $http.put('/api/session/', data, config).then(function(response){
					return response;
				});
				return promise;
			}
		};
		return devicesService;
	})];
})