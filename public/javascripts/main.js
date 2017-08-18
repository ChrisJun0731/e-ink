/**
 * Created by Administrator on 2017/7/22.
 */
require.config({
	//default baseUrl is the directory of script in data-main
	baseUrl: 'javascripts/plugins',
	paths: {
		'angular': 'angular.min',
		'angularAMD': 'angularAMD.min',
		'app': '../start',
		'services': '../services',
		'xeditable': 'xeditable',
		'ui-bootstrap': 'ui-bootstrap-tpls-2.5.0',
		'angular-toastr': 'angular-toastr.tpls'
	},
	shim:{
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: ['angular']
		},
		'Chart': ['Moment'],
		'angularAMD': ['angular'],
		'xeditable': ['angular'],
		'angular-animate': ['angular'],
		'ui-bootstrap': ['angular', 'angular-animate'],
		'angular-toastr': ['angular']
	},
	deps: ['app']
});