
angular.module('dailySale')
.controller('DailySaleDetailsController',[
'$scope',
'$state',
'DrugStoreService',
'DailySaleService',
'currentDailySale',
function($scope,$state,DrugStoreService,DailySaleService,currentDailySale){

  $scope.dailySale=currentDailySale;
  DrugStoreService.setOldState(MENU.DAILYSALE);
/*   $scope.modifierStatus=false;
  $scope.modifierTitle=false;*/
if ($scope.dailySale !=null && $scope.dailySale.commandes.length>0){
  $scope.selectedCommand=$scope.dailySale.commandes[0];
  $scope.selectedCommand.selected=true;
}
else{
  $scope.selectedCommand={};
}
  
  
  
  $scope.changeSelectedCommand=function(command){
    $scope.selectedCommand.selected=false;
    command.selected=true;
    $scope.selectedCommand=command;
    $scope.resteApayer=$scope.updateResteApayer();
  };


$scope.getClientName=function(){
  $scope.clientName='inconnu';
    if ($scope.selectedCommand.clientType && $scope.selectedCommand.clientType !='autre'){
      $scope.clientName="Mr "+$scope.selectedCommand.client.prenom+" "+
      $scope.selectedCommand.client.nom+ " ("+$scope.selectedCommand.client.telephone+")";
    }
    return $scope.clientName;
}

  var updateDailySaleInfo=(index)=>{

     var nbProduits=$scope.dailySale.totalProduits;
     var benefice=$scope.dailySale.benefice;
     var chiffreAffaire=$scope.dailySale.chiffreAffaire;

$scope.dailySale.totalProduits=Number.parseInt(nbProduits
  )- Number.parseInt($scope.dailySale.commandes[index].totalProduits);

$scope.dailySale.chiffreAffaire=Number.parseInt(chiffreAffaire
  )- Number.parseInt($scope.dailySale.commandes[index].chiffreAffaire);

$scope.dailySale.chiffreAffaire=Number.parseInt(benefice
  )- Number.parseInt($scope.dailySale.commandes[index].benefice);

  };

$scope.deleteCommand=function(command){
  var index=$scope.dailySale.commandes.findIndex((commande)=>{
    return commande._id==command._id;
  });
  updateDailySaleInfo(index);
  if($scope.selectedCommand._id==$scope.dailySale.commandes[index]._id){
    $scope.selectedCommand=$scope.dailySale.commandes[index==0 ? 1:index-1];
    $scope.selectedCommand.selected=true;
  }
  $scope.dailySale.deletedCommand=$scope.dailySale.deletedCommand==null? [] : $scope.dailySale.deletedCommand;
  $scope.dailySale.deletedCommand.push(
    $scope.dailySale.commandes[index]._id
    );
  $scope.dailySale.commandes.splice(index,1);
};

$scope.modifyStatus=function(){
  $scope.modifierStatus=true;
};
$scope.modifyTitle=function(){
  $scope.modifierTitle=true;
};

$scope.prixTotal=(produit)=>{
  if (produit) {
    return Number.parseInt(produit.quantite,10)*Number.parseInt(produit.produit.prixVente,10);
  }
  else{
    console.log("scope.commande can not be empty");
    return null;
  }
};
$scope.saveAllChange=function(){

    $scope.modifierStatus=false;
    $scope.modifierTitle=false;
  /*  $scope.dailySale.remainCommand= $scope.dailySale.commandes !=null? $scope.dailySale.commandes.map(commande=>commande._id):[];
   delete  $scope.dailySale.commandes;*/
  // $scope.dailySale.commandes= $scope.dailySale.remainCommand;
    console.log($scope.deletedCommand);
    DailySaleService.update($scope.dailySale,(response)=>{
       if(response.status){

                console.log(response);
                $scope.dailySale=response.data;
            $scope.selectedCommand= $scope.dailySale !=null ? $scope.dailySale.commandes[0]:null;
            DrugStoreService.succesRequest(response.message);
        }
        else{
          console.log(response.data);
           DrugStoreService.succesRequest(response.message);
        }

    });

  };

  $scope.updateResteApayer=()=>{
    var chiffreAffaire=Number.parseInt($scope.selectedCommand.chiffreAffaire);
    var montantPayer=Number.parseInt($scope.selectedCommand.montantPayer);
    
      if( !Number.isNaN(montantPayer) && (montantPayer <= chiffreAffaire)){

         return chiffreAffaire-montantPayer;
       }
       else
        return undefined;
};

}]);


/*{
  "_id": "58703ca5311c2c10e06c025d",
  "title": "2016 dec 22",
  "chiffreAffaire": 2300000,
  "etat": true,
  "benefice": 700000,
  "__v": 0,
  "commandes": [
    {
      "_id": "586fecb1ebc70c21ecee62f1",
      "title": "143282486388209380",
      "payer": true,
      "__v": 0,
      "produits": [
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef07fd",
                "quantite": 32,
                "expirationDate": "2022-08-06T00:00:00.000Z",
                "emplacement": "1F"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "doliprane",
            "_id": "586e5c5ccf4bf538d8ef07fc"
          },
          "quantite": 1,
          "_id": "586fecb1ebc70c21ecee62f5"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef081c",
                "quantite": 126,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "4x"
              }
            ],
            "__v": 0,
            "prixVente": 50,
            "prixAchat": 30,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "hexaquine",
            "_id": "586e5c5ccf4bf538d8ef081b"
          },
          "quantite": 4,
          "_id": "586fecb1ebc70c21ecee62f4"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0838",
                "quantite": 210,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "3F"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": " dexeryl",
            "_id": "586e5c5ccf4bf538d8ef0837"
          },
          "quantite": 1,
          "_id": "586fecb1ebc70c21ecee62f3"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0856",
                "quantite": 210,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "3F"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "speciafoldine",
            "_id": "586e5c5ccf4bf538d8ef0855"
          },
          "quantite": 1,
          "_id": "586fecb1ebc70c21ecee62f2"
        }
      ],
      "dailySaleId": null,
      "date": "2016-12-23T00:00:00.000Z",
      "benefice": 140,
      "totalProduits": 7,
      "chiffreAffaire": 500,
      "clientType": "autre",
      "client": null
    },
    {
      "_id": "586fecb1ebc70c21ecee630d",
      "title": "308833405804368900",
      "payer": true,
      "__v": 0,
      "produits": [
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0809",
                "quantite": 30,
                "expirationDate": "2027-12-06T00:00:00.000Z",
                "emplacement": "9F"
              }
            ],
            "__v": 0,
            "prixVente": 250,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "paracetamol biogaran",
            "_id": "586e5c5ccf4bf538d8ef0808"
          },
          "quantite": 5,
          "_id": "586fecb1ebc70c21ecee6310"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0826",
                "quantite": 210,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "35b"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "aerius",
            "_id": "586e5c5ccf4bf538d8ef0825"
          },
          "quantite": 5,
          "_id": "586fecb1ebc70c21ecee630f"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0844",
                "quantite": 210,
                "expirationDate": "2017-01-15T00:00:00.000Z",
                "emplacement": "3F"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": " endotelon",
            "_id": "586e5c5ccf4bf538d8ef0843"
          },
          "quantite": 5,
          "_id": "586fecb1ebc70c21ecee630e"
        }
      ],
      "dailySaleId": null,
      "date": "2016-12-22T00:00:00.000Z",
      "benefice": 1050,
      "totalProduits": 15,
      "chiffreAffaire": 2250,
      "clientType": "autre",
      "client": null
    },
    {
      "_id": "586fecb1ebc70c21ecee6311",
      "title": "239276577215379200",
      "payer": true,
      "__v": 0,
      "produits": [
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0803",
                "quantite": 410,
                "expirationDate": "2022-07-06T00:00:00.000Z",
                "emplacement": "3F"
              }
            ],
            "__v": 0,
            "prixVente": 170,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": " kardegic",
            "_id": "586e5c5ccf4bf538d8ef0802"
          },
          "quantite": 5,
          "_id": "586fecb1ebc70c21ecee6314"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0828",
                "quantite": 110,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "32a"
              }
            ],
            "__v": 0,
            "prixVente": 105,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "diprosone",
            "_id": "586e5c5ccf4bf538d8ef0827"
          },
          "quantite": 2,
          "_id": "586fecb1ebc70c21ecee6313"
        },
        {
          "produit": {
            "details": [
              {
                "_id": "586e5c5ccf4bf538d8ef0846",
                "quantite": 210,
                "expirationDate": "2022-12-06T00:00:00.000Z",
                "emplacement": "3F"
              }
            ],
            "__v": 0,
            "prixVente": 100,
            "prixAchat": 80,
            "description": " 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
            "nom": "biocalyptol",
            "_id": "586e5c5ccf4bf538d8ef0845"
          },
          "quantite": 4,
          "_id": "586fecb1ebc70c21ecee6312"
        }
      ],
      "dailySaleId": null,
      "date": "2016-12-22T00:00:00.000Z",
      "benefice": 580,
      "totalProduits": 11,
      "chiffreAffaire": 1460,
      "clientType": "autre",
      "client": null
    }
  ],
  "date": "2016-12-22T00:00:00.000Z",
  "totalProduits": 10
}*/