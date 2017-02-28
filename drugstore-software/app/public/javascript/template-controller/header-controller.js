angular.module("controller.template")
.controller('HeaderController',[
	'$scope',
	'$state',
	'UserAuthService',
	'DrugStoreService',
	function($scope,$state,UserAuthService,DrugStoreService){

		 $scope.currentUser = UserAuthService.currentUser;
		 $scope.goHome=DrugStoreService.reload;
		

	}]);
