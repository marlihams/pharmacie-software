
angular.module('home')
.controller('HomeCtrl',[
'$scope',
'$state',
'UserAuthService',
'$http',
function($scope,$state,UserAuthService,$http){

  $scope.isLoggedIn = UserAuthService.isLoggedIn;
 
  $scope.logOut = UserAuthService.logOut;
 // $scope.data=productList;//productList,
	//console.log($scope.data);

$scope.userName="Mr diallo";
  $scope.dailysaleList=[
  {
      nom: "Paracétamol",
      quantite: 2,
      prixVente: '2000 GNF',
  }, {
      nom: "Ibuprofène",
      quantite: 4,
      prixVente: "3000GNF",
  }, {
      nom: "Tramadol ",
      quantite:5 ,
      prixVente: "3000GNF"
  }, {
      nom:'Ibuprofène' ,
      quantite: 3,
      prixVente: "3000GNF"
  }, {
      nom:'Acétylsalicylique acide' ,
      quantite: 2,
      prixVente: "3000GNF"  
    }
  ];

 $scope.etat="En cours";

  $scope.homeCollection=$scope.dailysaleList;
  $scope.title="liste des produits";
  $scope.menuClass="menu-selected-element";
  // $http.get('/home/produits').success(function(response){
  // 		$scope.test1=response.test;
  // })
  // .error(function(data,status){
  // 	console.error(data);
  // });

  //  $http.get('/home/dailysales').success(function(response){
  // 		$scope.test2=response.test;
  // })
  // .error(function(data,status){
  // 	console.error(data);
  // }); 

   $scope.currentNavItem = 'page1';
}
]);

