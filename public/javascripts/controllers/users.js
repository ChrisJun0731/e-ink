/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/usersService'], function () {
	return ['$scope', 'UsersService', function ($scope, usersService) {
		usersService.getUsers().then(function (rs) {
			$scope.users = rs.data;
			console.log(rs.data);
		});
		$scope.addUser = function () {
			$scope.newUser = {
				Username: '',
				Password: '',
				IsActive: true,
				IsAPI: false,
				IsNew: true
			};
			$scope.users.push($scope.newUser);
		};
		$scope.removeUser = function (index) {
			if (!$scope.users[index].IsNew) {
				usersService.deleteUser({params: {id: $scope.users[index].Username}}).then(function (rs) {
					console.log(rs);
				});
			}
			$scope.users.splice(index, 1);
		};
		$scope.saveOrUpdateUser = function (user, index) {
			if (user.IsNew) {
				delete user.IsNew;
				usersService.saveUser(user).then(function (rs) {
					console.log(rs);
				});
			} else {
				delete user.IsNew;
				usersService.updateUser(user, user.Username).then(function (rs) {
					console.log(rs);
				});
			}
			$scope.users[index] = user;
		};
	}];
})