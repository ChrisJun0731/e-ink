/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/usersService'], function(){
	return['$scope', 'UsersService', function($scope, usersService){
		var oldUsers = [];
		usersService.getUsers().then(function(rs){
			$scope.users = rs.data;
			console.log(rs.data);
			oldUsers = $scope.users;
		});
		$scope.addUser = function(){
			$scope.AddUser = {
				Username: '',
				Password: '',
				IsActive: true,
				IsAPI: false,
				IsNew: true
			};
			$scope.users.push($scope.AddUser);
		};
		$scope.removeUser = function(index){
			usersService.deleteUser({params:{id: $scope.users[index].Username}}).then(function(rs){
				console.log(rs);
			});
			usersService.getUsers().then(function(rs){
				$scope.users = rs.data;
				oldUsers = rs.data;
			});
		};
		$scope.saveOrUpdateUser = function(user, index){
			if(user.IsNew){
				delete user.IsNew;
				usersService.saveUser(user).then(function(rs){
					console.log(rs);
				});
				usersService.getUsers().then(function(rs){
					$scope.users = rs.data;
					oldUsers = rs.data;
				});
			}
			else{
				delete user.IsNew;
				usersService.updateUser(user, {params: {id: oldUsers[index].Username}}).then(function(rs){
					console.log(rs);
				});
				usersService.getUsers().then(function(rs){
					$scope.users = rs.data;
					oldUsers = rs.data;
				});
			}
		};
	}];
})