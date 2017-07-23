/**
 * Created by Administrator on 2017/7/23.
 */
define(['angularAMD.min', 'angular-ui-router'], function(angularAMD){
  var app = angular.module('app', ['ui.router']);
  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/controllers");
    $stateProvider
        .state('status', {
          url: '/status',
          views: {
            'container@': angularAMD.route({
              templateUrl: 'templates/status.html',
              controllerUrl: 'javascripts/controllers/status.js'
            })
          }
        })
        .state('devices', {
          url: '/devices',
          views:{
            'container@': angularAMD.route({
              templateUrl: 'templates/devices.html',
              controllerUrl: 'javascripts/controllers/devices.js'
            })
          }
        })
        .state('apps', {
          url: '/apps',
          views: {
            'container@': angularAMD.route({
              templateUrl: 'templates/apps.html',
              controllerUrl: 'javascripts/controllers/apps.js'
            })
          }
        })
        .state('users', {
          url: '/users',
          views: {
            'container@': angularAMD.route({
              templateUrl: 'templates/users.html',
              controllerUrl: 'javascripts/controllers/users.js'
            })
          }
        })
        .state('settings', {
          url: '/settings',
          views:{
            'container@': angularAMD.route({
              templateUrl: 'templates/settings.html',
              controllerUrl: 'javascripts/controllers/settings.js'
            })
          }
        })
  });
  return angularAMD.bootstrap(app);
});