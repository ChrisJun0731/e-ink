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
			deleteDevices: function(config){
				var promise = $http.delete('/api/device/', config).then(function(response){
					return response;
				});
				return promise;
			},
			rebootDevices: function(data){
				var promise = $http.post('/api/device/reboot', data).then(function(response){
					return response;
				});
				return promise;
			},
			restartSessions: function(data){
				var promise = $http.post('/api/session/restart', data).then(function(response){
					return response;
				});
				return promise;
			},
			clearWebCaches: function(data){
				var promise = $http.post('/api/session/webkit-clear-cache', data).then(function(response){
					return response;
				});
				return promise;
			},
			deleteDevices: function(config){
				var promise = $http.delete('/api/device/', config).then(function(response){
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