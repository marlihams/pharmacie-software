
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
  /* $scope.command={

     "_id": "586fecb1ebc70c21ecee62ec",
        "title": "586fecb1ebc70c21ecee62ec",
        "payer": true,
        "__v": 0,
        "produits": [
          {
            "produit": {
              "details": [
                {
                  "_id": "586e5c5ccf4bf538d8ef07fb",
                  "quantite": 210,
                  "expirationDate": "2022-12-06T00:00:00.000Z",
                  "emplacement": "2F"
                }
              ],
              "__v": 0,
              "prixVente": 100,
              "prixAchat": 80,
              "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
              "nom": "ibuprofène",
              "_id": "586e5c5ccf4bf538d8ef07fa"
            },
            "quantite": 4,
            "_id": "586fecb1ebc70c21ecee62f0"
          }],
         
        "dailySaleId": null,
        "date": "2016-12-23T00:00:00.000Z",
        "clientType": "autre",
        "client": null
      };*/
}
]);

