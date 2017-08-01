/**
 * Created by Administrator on 2017/7/25.
 */
define(['app'], function(app){
	return[app.factory('AppsService', function($http){
		var appsService = {
			getApps: function(){
				var promise = $http.get('/api/app/').then(function(response){
					return response;
				});
				return promise;
			},
			delApp: function(config){
				var promise = $http.delete('/api/app/', config).then(function(response){
					return response;
				});
				return promise;
			},
			saveApp: function(data, config){
				var promise = $http.put('/api/app/', data, config).then(function(response){
					return response;
				});
				return promise;
			},
			addApp: function(data){
				var promise = $http.post('/api/app/', data).then(function(response){
					return response;
				});
				return promise;
			}
		};
		return appsService;
	})];
});