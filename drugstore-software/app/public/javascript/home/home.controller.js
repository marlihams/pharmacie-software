
angular.module('home')
.controller('HomeCtrl',[
'$scope',
'$state',
'UserAuthService',
'DrugStoreService',
'DailySaleService',
'commonData',
function($scope,$state,UserAuthService,DrugStoreService,DailySaleService,commonData){

  $scope.isLoggedIn = UserAuthService.isLoggedIn;
 
  $scope.logOut = UserAuthService.logOut;
  if (commonData.depenseInfo){
    DrugStoreService.infoRequest(commonData.depenseInfo);
  }

  var getweekSale=function(){

    if (!DrugStoreService.hasCommand()){
       
           commonData.weeklySale.splice(0,1);
      }
      return commonData.weeklySale;
  };

  DrugStoreService.setCurrentDailySale(commonData.currentDailySale);
  $scope.currentDailySale=commonData.currentDailySale;
  $scope.recentDailySale=commonData.currentDailySale;

  $scope.worstDailySale=commonData.worstMonthDailySale;
  $scope.bestDailySale=commonData.bestMonthDailySale;
  
  $scope.weeklyDailySale=getweekSale();


  $scope.statusTooltip=function(){

   return $scope.currentDailySale.etat ? "vente valider" :"vente non valider";
  };

  $scope.currentSale=function(){

    if (DrugStoreService.hasCommand()){ 
      // si une commande a déjà été passé aujourdhui
      return commonData.currentDailySale.chiffreAffaire;
    }
    else{
      return 0;
    }
  };

  $scope.changeCurrentDailySale=function(dailysaleId){
    DailySaleService.getDailySaleById(
      dailysaleId,
      function(dailySale){

        $scope.currentDailySale=dailySale;
        DrugStoreService.setCurrentDailySale(dailySale);
        

      }
    );
  };

$scope.allExpanded=false;
$scope.toogleAllCommand=function(){
  console.log("toogleAllCommand");
  if ($scope.allExpanded){
    $scope.accordion.collapseAll();
    $scope.allExpanded=false;
  }
  else{
     $scope.accordion.expandAll();
    $scope.allExpanded=true;
  }
};
 

  $scope.title="liste des produits";
  $scope.menuClass="menu-selected-element";
 
   $scope.currentNavItem = 'page1';
 
 $scope. createNewProduit=function(){
  $state.go("produit-new");
 };

$scope. createNewClient=function(){
  alert("contacter votre administrateur du site");
 };

$scope.createNewCommand=function(){
  $state.go("commande-new");
 };

  $scope.displayDepense=function(){
  $state.go("depense-edit");
 };
}
]);

