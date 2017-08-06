/**
 * Created by Administrator on 2017/7/23.
 */
define(['Chart', 'services/devicesService', 'services/appsService'], function(Chart){
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

			//Status&Settings
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

			//Live view
			devicesService.getImages({params:{id: device.Uuid}}).then(function(rs){
				$scope.serverImgPath = rs.data.serverImgPath;
				$scope.clientImgPath = rs.data.clientImgPath;
			});

			//Charts
			$scope.$on('renderFinished', function(e){
				var ctx = angular.element('#signalChart').get(0).getContext('2d');
				var data = {
					labels : ["January","February","March","April","May","June","July"],
					datasets : [
						{
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : [65,59,90,81,56,55,40]
						},
						{
							fillColor : "rgba(151,187,205,0.5)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							data : [28,48,40,19,96,27,100]
						}
					]
				};
				new Chart(ctx).Line(data);
			});
		};
	}];

})