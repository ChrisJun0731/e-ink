/**
 * Created by Administrator on 2017/7/23.
 */
define(['moment', 'Chart.bundle', 'angular', 'services/devicesService', 'services/appsService'], function(moment, Chart, angular){
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
			$scope.drawChart = function(configs) {
				var signalCtx = angular.element('#signalChart').get(0).getContext('2d');
				var batteryCtx = angular.element('#batteryChart').get(0).getContext('2d');
				var tempCtx = angular.element('#tempChart').get(0).getContext('2d');
				var extTempCtx = angular.element('#extTempChart').get(0).getContext('2d');
				var disconCtx = angular.element('#disconChart').get(0).getContext('2d');
				var imagesCtx = angular.element('#imagesChart').get(0).getContext('2d');
				new Chart(signalCtx, configs.signalConfig);
				new Chart(batteryCtx, configs.batteryConfig);
				new Chart(tempCtx, configs.tempConfig);
				new Chart(extTempCtx, configs.extTempConfig);
				new Chart(disconCtx, configs.disconConfig);
				new Chart(imagesCtx, configs.imagesConfig);
			};

			$scope.createConfig = function(points, title){
				var config = {
					type: 'line',
					data: {
						datasets: [
							{
								data: points,
								fill: false
							}
						]
					},
					options: {
						responsive: true,
						title: {
							display: true,
							text: title
						},
						scales: {
							xAxes: [{
								type: 'time',
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Date'
								}
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true
								}
							}]
						}
					}
				};
				return config;
			};

			$scope.createPoints = function(data1, data2){
				var points = [];
				angular.forEach(data1, function(data, index){
					points.push({x: data1[index], y: data2[index]});
				});
				return points;
			};

			$scope.drawCharts = function(from, to){
				devicesService.getDeviceStatus({params: {id: device.Uuid, from: from, to: to}})
					.then(function(rs){
						console.log('设备的状态信息:'+ rs.data)
						var deviceStatus = rs.data;
						var signalData = [];
						var batteryData = [];
						var temperatureData = [];
						var extTempData = [];
						var disconData = [];
						var imagesData = [];
						var transferData = [];
						var xAxes = [];

						angular.forEach(deviceStatus, function(status){
							signalData.push(status.Status.RSSI);
							batteryData.push(status.Status.Battery);
							temperatureData.push(status.Status.Temperature);
							extTempData.push(status.Status.ExternalTempSensor);
							disconData.push(status.Status.Disconnects);
							imagesData.push(status.Status.Images);
							xAxes.push(moment({y: status.Date[0], M: status.Date[1], d: status.Date[2], h: status.Date[3],
								m: status.Date[4], s: status.Date[5]}).toDate());
						});

						var signalDataPoints = $scope.createPoints(xAxes, signalData);
						var batteryDataPoints = $scope.createPoints(xAxes, batteryData);
						var tempDataPoints = $scope.createPoints(xAxes, temperatureData);
						var extTempDataPoints = $scope.createPoints(xAxes, extTempData);
						var disconDataPoints = $scope.createPoints(xAxes, disconData);
						var imagesDataPoints = $scope.createPoints(xAxes, imagesData);

						var signalConfig = $scope.createConfig(signalDataPoints, 'Signal Strength');
						var batteryConfig = $scope.createConfig(batteryDataPoints, 'Battery');
						var tempConfig = $scope.createConfig(tempDataPoints, 'Temperature');
						var extTempConfig = $scope.createConfig(extTempDataPoints, 'External Temperature');
						var disconConfig = $scope.createConfig(disconDataPoints, 'Disconnects');
						var imagesConfig = $scope.createConfig(imagesDataPoints, 'Images');

						var configs = {
							signalConfig: signalConfig,
							batteryConfig: batteryConfig,
							tempConfig: tempConfig,
							extTempConfig: extTempConfig,
							disconConfig: disconConfig,
							imagesConfig: imagesConfig
						};

						return configs;
					}).then(function(configs){
					$scope.drawChart(configs);
				});
			};

			$scope.drawCharts(null, null);

		};
	}];
});