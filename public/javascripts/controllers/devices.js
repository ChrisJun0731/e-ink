/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/devicesService'], function(){
	return['$scope', 'DevicesService', '$uibModal', function($scope, devicesService, $uibModal){
		devicesService.getDevices().then(function(rs){
			$scope.devices = rs.data;
		});
		$scope.openDeviceModal = function(size, index){
			$uibModal.open({
				templateUrl: 'deviceModal.html',
				controller: deviceModalController,
				size: size,
				resolve:{
					device: function(){
						return $scope.devices[index];
					}
				}
			});
		};
		var deviceModalController = function($scope, device){
			$scope.uuid = device.Uuid;
		};
	}];

})