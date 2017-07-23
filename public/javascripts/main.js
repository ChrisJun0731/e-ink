/**
 * Created by Administrator on 2017/7/22.
 */
require.config({
  baseUrl: 'javascripts/plugins',
  path: {

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
      deps: ['angular.min']
    },
    'angularAMD.min': ['angular.min']
  },
  deps: ['../start']
});