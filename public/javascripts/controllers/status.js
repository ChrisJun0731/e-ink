/**
 * Created by Administrator on 2017/7/22.
 */
define(['services/statusService', 'services/devicesService'], function(){
	return['$scope', 'StatusService', 'DevicesService', function($scope, statusService, devicesService){
		devicesService.getDevices().then(function(rs){
			if(rs.status == 200){
				console.log(rs.data);
				var devices = rs.data;
				$scope.registerDeviceNum = devices.length;
				var onlineDeviceNum = 0;
				for(var i=0; i<devices.length; i++){
					if(devices[i].State != 'offline'){
						onlineDeviceNum++;
					}
				}
				$scope.onlineDeviceNum = onlineDeviceNum;
			}
			else{
				console.log(rs.status+ ":" + rs.statusText);
			}
		});
        statusService.getStatus().then(function(rs){
            $scope.prop = "";
            $scope.status = rs.data;
            angular.forEach($scope.status.Okulars, function(value, key){
                $scope.prop = key;
            });
            $scope.okulars = $scope.status.Okulars[$scope.prop];
        });
	}];
});
