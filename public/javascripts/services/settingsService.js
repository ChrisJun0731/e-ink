/**
 * Created by Administrator on 2017/7/25.
 */
define(['app'], function(app){
	return[app.factory('SettingsService', function($http){
		var settingsService = {
			getConfig: function(){
				var promise = $http.get('/api/config/').then(function(response){
					return response;
				});
				return promise;
			},
			restartServices: function(){
				var promise = $http.get('/api/srv/restart').then(function(response){
					return response;
				});
				return promise;
			},
			save: function(data){
				var promise = $http.put('/api/config/', data).then(function(response){
					return response;
				});
				return promise;
			},
			downloadLogs: function(){
				var promise = $http.get('/api/logs/').then(function(response){
					return response;
				});
				return promise;
			}
		};
		return settingsService;
	})];
});