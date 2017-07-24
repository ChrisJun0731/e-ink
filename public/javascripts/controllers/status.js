/**
 * Created by Administrator on 2017/7/22.
 */
define(['services/statusService'], function(){
  return['$scope','StatusService', function($scope, statusService){
    statusService.getHeaders({}).then(function(rs){
      console.log(rs.data);
    })
  }];
});
