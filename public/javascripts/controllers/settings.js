/**
 * Created by Administrator on 2017/7/23.
 */
define(['services/settingsService'], function(){
	return['$scope', 'SettingsService', function($scope, settingsService){
		settingsService.getConfig().then(function(rs){
			$scope.config = rs.data;
		});
		$scope.backends = ['HTTP', 'HTML'];
		$scope.enable_font_antialias = {
			"YES": true,
			"NO": false
		};
	}];
});