
angular.module('userAuth')
.controller('AuthCtrl', [
'$scope',
'$state',
'UserAuthService',
function($scope, $state, UserAuthService){
  $scope.user = {};

  $scope.register = function(){
   $scope.user.telephone='0605775396';
    UserAuthService.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home',{"selectedMenu":MENU.PRODUIT});
    });
  };

  $scope.logIn = function(){
    UserAuthService.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home',{"selectedMenu":MENU.PRODUIT});
    });
  };
  
  $scope.goLoginPage=function(){
    $state.go("pharmacie-paris");
  }

}]);