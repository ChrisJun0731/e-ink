/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/appsService'], function(){
	return['$scope', 'AppsService', function($scope, appsService){
		appsService.getApps().then(function(rs){
			$scope.apps = rs.data;
		});

		$scope.saveApp = function(data, id){
			if(id!= null){
				angular.extend(data, {_id: id});
				var config = {params: {id: id}};
				appsService.saveApp(data, config).then(function(rs){
					if(rs.status == 204){
						console.log("保存app成功!");
					}
				});
			}
			else{
				appsService.addApp(data).then(function(rs){
					if(rs.status == 200){
						console.log('新增app成功!');
						var end = $scope.apps.length- 1;
						$scope.apps.splice(end, 1);
						$scope.apps.push(rs.data);
					}
				});
			}
		};

		$scope.removeApp = function(index, id){
			var config = {params:{id: id}};
			appsService.delApp(config).then(function(rs){
				if(rs.status == 204){
					console.log('删除app成功!');
				}
			});
			$scope.apps.splice(index, 1);
		};

		$scope.addApp = function(){
			$scope.AddApp = {
				Name: '',
				Url: '',
				Description: ''
			};
			$scope.apps.push($scope.AddApp);
		};
	}];
});