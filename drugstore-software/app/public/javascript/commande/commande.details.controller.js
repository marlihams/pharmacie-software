
angular.module('commande')
.controller('CommandeDetailsController',[
'$scope',
'$state',
'currentCommand',
function($scope,$state,currentCommand){


$scope.commande=currentCommand;

$scope.prixTotal=(produit)=>{
  if (produit) {
    return Number.parseInt(produit.quantite,10)*Number.parseInt(produit.produit.prixVente,10);
  }
  else{
    console.log("scope.commande can not be empty");
    return null;
  }
}
$scope.resteAPayer=()=> {

  if ($scope.commande) {

    return $scope.commande.payer ? Number.parseInt($scope.commande.chiffreAffaire,10)-Number.parseInt($scope.commande.montantPayer,10) : '0' ;
  }
  else{
    console.log("scope.commande can not be empty");
    return null;
  }
  };
}
]);

