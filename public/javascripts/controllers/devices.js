/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/devicesService'], function(){
	return['$scope', 'DevicesService', '$uibModal', function($scope, devicesService, $uibModal){
		devicesService.getDevices().then(function(rs){
			$scope.devices = rs.data;
		});
		$scope.openDeviceModal = function(size, uuid){
			$uibModal.open({
				templateUrl: 'deviceModal.html',
				controller: deviceModalController,
				size: size,
				resolve:{
					uuid: function(){
						return uuid;
					}
				}
			});
		};
		var deviceModalController = function($scope, uuid){
			$scope.uuid = uuid;
		};
	}];

})