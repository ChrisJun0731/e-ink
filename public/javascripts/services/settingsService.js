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
			}
		};
		return settingsService;
	})];
});