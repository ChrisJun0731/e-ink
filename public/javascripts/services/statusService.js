/**
 * Created by Administrator on 2017/7/24.
 */
define(['app'], function(app){
	return[app.factory('StatusService', function($http){
		var statusService = {
			getStatus: function(){
				var promise = $http.get('/api/status/').then(function(response){
					return response;
				});
				return promise;
			}
		};
		return statusService;
	})];
});