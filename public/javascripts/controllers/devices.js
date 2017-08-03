/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/devicesService', 'services/appsService'], function(){
	return['$scope', 'DevicesService', 'AppsService', '$uibModal', function($scope, devicesService, appsService, $uibModal){
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
			$scope.device = device;
			$scope.backends = [
				{
					label: 'HTML - Webkit renderer',
					value: 'HTML'
				},
				{
					label: 'Http - external renderer',
					value: 'HTTP'
				}
			];
			$scope.ditherings = ['none', 'bayer', 'floyd-steinberg'];
			$scope.encodings = ["1", "4"];
			devicesService.getSession({params:{id: device.Uuid}}).then(function(rs){
				$scope.session = rs.data;
			});
			appsService.getApps().then(function(rs){
				$scope.apps = rs.data;
			});

		};
	}];

})