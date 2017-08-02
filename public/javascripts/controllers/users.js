/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/usersService'], function(){
	return['$scope', 'UsersService', function($scope, usersService){
		usersService.getUsers().then(function(rs){
			$scope.users = rs.data;
			console.log(rs.data);
		});
		$scope.addUser = function(){
			var user = {

			}
		};
		$scope.removeUser = function(index, id){

		};
		$scope.saveUser = function(data, id){
			angular.extend(data, {_id: id});

		};
	}];
})