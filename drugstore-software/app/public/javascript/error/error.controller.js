
angular.module('error')
.controller('ErrorController', [
'$scope',
'$state',
'UserAuthService',
function($scope, $state, UserAuthService){
  console.log($state.params.error);

 /*  message: err.message,
        status:err.status,
        error: err
        */
  $scope.error=$state.params.error? $state.params.error :null;
  if ($scope.error==null){
    error.status="";
    error.message="";
    error.stack="oups something happen!!!go to the login page";
  }
  UserAuthService.logOut();

}]);