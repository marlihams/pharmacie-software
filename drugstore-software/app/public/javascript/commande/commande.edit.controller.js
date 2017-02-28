
angular.module('commande')
.controller('CommandeEditController',[
'$scope',
'$state',
'DrugStoreService',
'CommandeService',
'currentCommand',
function($scope,$state,DrugStoreService,CommandeService,currentCommand){

  console.log("commande edit controller");
}
]);

