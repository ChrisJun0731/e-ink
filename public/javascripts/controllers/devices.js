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
			var timeFormat = 'MM/DD/YYYY HH:mm';
			// console.log('当前时间的utc为:'+ today.utc()/1000);
			// console.log('上个月的utc为:'+ lastMonth.utc()/1000);
			$scope.drawLine = function(){
				var ctx = angular.element('#signalChart').get(0).getContext('2d');
				function newDate(days){
					return moment().add(days, 'd');
				}
				var labels = [
					newDate(0),
					newDate(1),
					newDate(2),
					newDate(3),
					newDate(4),
					newDate(5),
					newDate(6),
					newDate(7)
				]

				var data =  {
					labels: labels,
					datasets: [{
						label: "Signal Strength",
						data: [4,5,6,8,19,29,8,19],
						lineTension: 0
					}]
				};

				var chart = new Chart(ctx, {
					type: 'line',
					data: data,
					options: {
						scales: {
							xAxes: [
								{
									type: 'time',
									time: {
										// format: timeFormat,
										// displayFormats: {
										// 	day: 'll',
										// },
										tooltipFormat: 'll HH:mm',
										max: moment().add(30, 'd'),
										min: moment().subtract(10, 'd'),
										// unit: 'week'
										unitStepSize: 2
									},
									scaleLabel: {
										display: true,
										labelString: 'Date'
									}
								}
							],
							yAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'value'
									}
								}
							]
						}
					}
				});
			};


		};
	}];

})