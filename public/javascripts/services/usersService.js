/**
 * Created by Administrator on 2017/7/25.
 */
define(['app'], function(app){
	return[app.factory('UsersService', function($http){
		var usersService = {
			getUsers: function(){
				var promise = $http.get('/api/user/').then(function(response){
					return response;
				});
				return promise;
			}
		};
		return usersService;
	})];
});