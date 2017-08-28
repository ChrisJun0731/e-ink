/**
 * Created by Administrator on 2017/7/23.
 */
define(['moment', 'Chart.bundle', 'angular', 'services/devicesService', 'services/appsService'], function(moment, Chart, angular){
	return['$scope', 'toastr', 'DevicesService', 'AppsService', '$uibModal', function($scope, toastr, devicesService, appsService, $uibModal){

		$scope.getDevices = function(){
			devicesService.getDevices().then(function(rs){
				$scope.devices = rs.data;
			})
		};

		$scope.getDevices();

		setInterval($scope.getDevices, 5000);

		// $scope.selectAllDevice = function(){
		// 	if($scope.all_flag == false){
		// 		angular.forEach($scope.devices, function(device){
		// 			device.selected = true;
		// 		});
		// 		$scope.all_flag = true;
		// 	}
		// 	else{
		// 		angular.forEach($scope.devices, function(device){
		// 			device.selected = false;
		// 		});
		// 		$scope.all_flag = false;
		// 	}
		// };

		$scope.openDeviceModal = function(size, index){
			var uibModalInstance = $uibModal.open({
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
			$scope.rotations = [
				{label: '0°', value: 0},
				{label: '90°', value: 1},
				{label: '180°', value: 2},
				{label: '270°', value: 3}
			];

			$scope.rebootDevice = function(){
				if(device.State == 'offline'){
					toastr.warning('设备不在线，无法重启！');
					return;
				}
				devicesService.rebootDevice($scope.device.Uuid).then(function(rs){
					if(rs.status == 204){
						toastr.success('设备重启成功！');
					}else{
						toastr.error('设备重启失败');
					}
				});
			};

			$scope.restartSession = function(){
				if(device.State == 'offline'){
					toastr.warning('设备不在线，无法重启！');
					return;
				}
				devicesService.restartSession($scope.device.Uuid).then(function(rs){
					if(rs.status == 204){
						toastr.success('设备会话重启成功！');
					}else{
						toastr.error('设备会话重启失败！');
					}
				});
			};
			$scope.clearWebCache = function(){
				devicesService.clearWebCache($scope.device.Uuid).then(function(rs){
					if(rs.status == 204){
						toastr.success('清除设备缓存成功！');
					}else{
						toastr.error('清除设备缓存失败！');
					}
				});
			};
			$scope.deleteDevice = function(){
				devicesService.deleteDevice($scope.device.Uuid).then(function(rs){
					if(rs.status == 204){
						toastr.success('设备删除成功！');
					}else{
						toastr.error('设备删除失败！');
					}
				});
				devicesService.getDevices().then(function(rs){
					$scope.devices = rs.data;
				});
			};

			appsService.getApps().then(function(rs){
				$scope.apps = rs.data;
			});

			$scope.close = function(){
				$scope.$dismiss('cancel');
			};

			$scope.save = function(){
				var device = $scope.device;
				var session = $scope.session;
				var displays = device.Displays;
				for(i in displays){
					displays[i].Rotation = displays[0].Rotation;
				}
				device.Displays = displays;
				devicesService.saveDevice(device, {params:{id: device.Uuid}}).then(function(rs){
					if(rs.status == 204){
						toastr.success('设备状态和设置保存成功！');
					}
				});
				devicesService.saveSession(session, {params:{id: session.Uuid}}).then(function(rs){
					if(rs.status == 204){
						toastr.success('设备会话保存成功！');
					}
				});
			};

			//Live view
			$scope.getImages = function(){
				devicesService.getImages({params:{id: device.Uuid}}).then(function(rs){
					$scope.serverImgPath = rs.data.serverImgPath+'?random='+Math.random();
					$scope.clientImgPath = rs.data.clientImgPath+'?random='+Math.random();
				});
			};
			$scope.getImages();
			setInterval($scope.getImages, 5000);

			//Charts
			$scope.drawChart = function(configs) {
				var signalCtx = angular.element('#signalChart').get(0).getContext('2d');
				var batteryCtx = angular.element('#batteryChart').get(0).getContext('2d');
				var tempCtx = angular.element('#tempChart').get(0).getContext('2d');
				var extTempCtx = angular.element('#extTempChart').get(0).getContext('2d');
				var disconCtx = angular.element('#disconChart').get(0).getContext('2d');
				var imagesCtx = angular.element('#imagesChart').get(0).getContext('2d');
				var signalChart = new Chart(signalCtx, configs.signalConfig);
				var batteryChart = new Chart(batteryCtx, configs.batteryConfig);
				var tempChart = new Chart(tempCtx, configs.tempConfig);
				var extTempChart = new Chart(extTempCtx, configs.extTempConfig);
				var disconChart = new Chart(disconCtx, configs.disconConfig);
				var imagesChart = new Chart(imagesCtx, configs.imagesConfig);
			};

			$scope.createConfig = function(points, title){
				var config = {
					type: 'line',
					data: {
						datasets: [
							{
								data: points,
								fill: false,
								borderColor: '#002929'
							}
						]
					},
					options: {
						responsive: true,
						title: {
							display: true,
							text: title,
							fontSize: 20,
							padding: 20
						},
						scales: {
							xAxes: [{
								type: 'time',
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Date'
								}
							}]
						},
						legend: {
							display: false
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

			$scope.drawCharts = function(period){
				var from = {};
				var to = {};
				switch(period){
					case 'Today': {
						from = moment().startOf('day').unix();
						to = moment().endOf('day').unix();
					};
						break;
					case 'Yesterday': {
						from = moment().subtract(1, 'd').startOf('day').unix();
						to = moment().subtract(1, 'd').endOf('day').unix();
					};
						break;
					case 'Last 7 days': {
						from = moment().subtract(7, 'd').startOf('day').unix();
						to = moment().endOf('day').unix();
					};
						break;
					case 'Last 30 days': {
						from = moment().subtract(30, 'd').startOf('day').unix();
						to = moment().endOf('day').unix();
					};
						break;
					case 'This Month': {
						from = moment().startOf('month').unix();
						to = moment().endOf('month').unix();
					};
						break;
					case 'Last Month': {
						from = moment().subtract(1, 'month').startOf('month').unix();
						to = moment().subtract(1, 'month').endOf('month').unix();
					};
						break;
					default: ;
				}
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
							xAxes.push(moment({y: status.Date[0], M: status.Date[1]-1, d: status.Date[2], h: status.Date[3],
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

			$scope.periods = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month', 'Custom Range'];
			$scope.period = 'Last 30 days';
			$scope.drawCharts($scope.period);

		};
	}];
});