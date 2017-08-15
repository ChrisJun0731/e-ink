/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/settingsService'], function(){
	return['$scope', 'SettingsService', function($scope, settingsService){
		Array.prototype.contains = function(needle){
			for(var i in this){
				if(this[i] == needle){
					return true;
				}
			}
			return false;
		};
		Array.prototype.remove = function(val){
			for(var i in this){
				if(this[i] == val){
					this.splice(i, 1);
					break;
				}
			}
		};

		settingsService.getConfig().then(function(rs){
			$scope.config = rs.data;
			if($scope.config.Features.contains('SleepManager')){
				$scope.sleepManager = true;
			}
			if($scope.config.Features.contains('ExternalBattery')){
				$scope.externalBattery = true;
			}
			if($scope.config.Features.contains('StatusRequester')){
				$scope.statusRequester = true;
			}
		});
		$scope.backends = ['HTTP', 'HTML'];
		$scope.enables = [{label: 'Yes', value: true}, {label: 'No', value: false}];
		$scope.supports = [{label: 'Yes', value: 1}, {label: 'No', value: 0}];
		$scope.depths = [{label: '1 bit', value: 1},{label: '4 bit', value: 4}];
		$scope.ditherings = [
			{label: 'None', value: 'none'},
			{label: 'Bayer', value:'bayer'},
			{label: 'Floyd-Steinberg', value:'floyd-steinberg'}
		];
		$scope.rotations = [
			{value: '0', label: '0°'},
			{value: '1', label: '90°'},
			{value: '2', label: '180°'},
			{value: '3', label: '270°'}
		];

		$scope.manipulateFeatures = function(type){
			if(type== 'sleep'){
				if($scope.sleepManager){
					$scope.config.Features.push('SleepManager');
				}
				else{
					$scope.config.Features.remove('SleepManager');
				}
			}
			else if(type== 'battery'){
				if($scope.externalBattery){
					$scope.config.Features.push('ExternalBattery');
				}
				else{
					$scope.config.Features.remove('ExternalBattery');
				}
			}
			else{
				if($scope.statusRequester){
					$scope.config.Features.push('StatusRequester');
				}else{
					$scope.config.Features.remove('StatusRequester');
				}
			}
		};

		$scope.restartServices = function(){
			settingsService.restartServices().then(function(rs){
				console.log(rs.data);
			});
		};

		$scope.save = function(){
			var data = $scope.config;
			settingsService.save(data).then(function(rs){
				console.log(rs.data);
			});
		};

		$scope.downloadLogs = function(){
			settingsService.downloadLogs().then(function(rs){
				console.log(rs.data);
			});
		}
	}];
});