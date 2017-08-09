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
			}
		};
		return devicesService;
	})];
})