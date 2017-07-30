/**
 * Created by Administrator on 2017/7/23.
 */
define(['../services/devicesService.js'], function(){
	return['$scope', 'DevicesService', function($scope, devicesService){
		devicesService.getDevices().then(function(rs){
			$scope.devices = rs.data;
		})
	}];

})