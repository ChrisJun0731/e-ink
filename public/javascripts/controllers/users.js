/**
 * Created by Administrator on 2017/7/23.
 */
define(['../services/usersService.js'], function(){
	return['$scope', 'UsersService', function($scope, usersService){
		usersService.getUsers().then(function(rs){
			$scope.users = rs.data;
			console.log(rs.data);
		})
	}];
})