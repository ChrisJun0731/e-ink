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
			},
			updateUser: function(data, username){
				var promise = $http.put('/api/user/'+username, data).then(function(response){
					return response;
				});
				return promise;
			},
			saveUser: function(data){
				var promise = $http.post('/api/user/', data).then(function(response){
					return response;
				});
				return promise;
			},
			deleteUser: function(config){
				var promise = $http.delete('/api/user/', config).then(function(response){
					return response;
				});
				return promise;
			}
		};
		return usersService;
	})];
});