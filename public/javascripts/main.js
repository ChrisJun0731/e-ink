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
      'xeditable': 'xeditable'
  },
  shim:{
    'jquery': {
      exports: '$'
    },
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'angularAMD': ['angular'],
	  'xeditable': ['angular']
  },
  deps: ['app']
});