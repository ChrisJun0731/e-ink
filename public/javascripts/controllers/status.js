/**
 * Created by Administrator on 2017/7/22.
 */
define(['services/devicesService'], function(){
  return['$scope', 'DevicesService', function($scope, devicesService){
	  devicesService.getDevices().then(function(rs){
        if(rs.status == 200){
            console.log(rs.data);
            var devices = rs.data;
            $scope.registerDeviceNum = devices.length;
            var onlineDeviceNum = 0;
            for(var i=0; i<devices.length; i++){
                if(devices[i].State == 'online'){
                    onlineDeviceNum++;
                }
            }
            $scope.onlineDeviceNum = onlineDeviceNum;
        }
        else{
            console.log(rs.status+ ":" + rs.statusText);
        }
    });
  }];
});
