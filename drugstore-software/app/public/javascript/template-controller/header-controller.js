angular.module("controller.template")
.controller('HeaderController',[
	'$scope',
	'$state',
	'UserAuthService',
	function($scope,$state,UserAuthService){

		 $scope.currentUser = UserAuthService.currentUser;

	}]);
