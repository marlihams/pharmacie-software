
angular.module('commande')
.controller('CommandeNewController',[
'$scope',
'$state',
'DrugStoreService',
'CommandeService',
'produitList',
'clientList',
function($scope,$state,DrugStoreService,CommandeService,
    produitList,clientList){

  console.log("commande edit controller");
  $scope.commande=DrugStoreService.createCommand();
  DrugStoreService.setOldState(MENU.COMMANDE);
 
 var cloneDetails=function(clone,details){
    clone.expirationDate=details.expirationDate;
    clone.emplacement=details.emplacement;
    clone.max=details.quantite;
    return clone;
 };
 $scope.produits=(()=>{
  console.log("build produits");
  var produits=[];
  produitList.forEach((produit)=>{
      if (produit.details.length>1){
         produit.details.forEach(function(details){
          var cloneProduit={};
          angular.copy(produit,cloneProduit);
       //   cloneProduit.expirationDate=details.
          cloneProduit=cloneDetails(cloneProduit,details);
          produits.push(cloneProduit);
         });
      }
      else{
        produit=cloneDetails(produit,produit.details[0]);
        produits.push(produit);
      }

    });
  return produits;
 })();

   var clientTest=[{
    "nom":"diallo",
    '_id': "01",
    'telephone':"0605775396"
  },
  {
    "nom":"madiou",
    "_id":"02",
    'telephone':"0605775396"
  },
   {
    "nom":"matthias",
    "_id":"04",
    'telephone':"0605775396"
  },
     {
    "nom":"Quentin",
     "_id":"05",
     'telephone':"0605775396"
  },
  {
    "nom":"mohamed",
    "_id":"03",
    'telephone':"0605775396"
  }];

  var buildCLientList=(clientArray)=>{

  var listClient=[];

      clientArray.forEach((client)=>{
          var obj={};
          obj._id=client._id;
          obj.display=client.nom +" ("+client.telephone+")";
          listClient.push(obj);
      });
      listClient.unshift({
        "display":"inconnu",
        "_id":null
      });
    return listClient;
  };


  $scope.clients=buildCLientList(clientList==null ? clientTest: clientList);


  var selectedProduit=()=>{
    var prodQuantite={};
    //console.log($scope.commande.produits);
    $scope.commande.produits.forEach(function(obj){
      
      prodQuantite[obj.produit._id]=obj.quantite;

    });
    return prodQuantite;
  };

  $scope.selectedProduit=selectedProduit();


  

$scope.setSelectedClient=function(){

  var client=null; 
    if ($scope.commande.client==null){
     
        client=$scope.clients[0];
      }
      else{

       client=$scope.clients.find((client)=>{
          return client._id==$scope.commande.client;
        });
       
      }
       $scope.selectedItem=client;
       return client.display;
};
  $scope.getMatches=(searchClient)=>{
    console.log("la recherche se fait sur "+ searchClient);

    var obj=$scope.clients.filter(function(client){

      return client.display.search(searchClient) !=-1;
    });
   return obj;
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

$scope.produitValueChanged=function(produit){
    

    if (!produit.checkBox){ // checkbox  has been unchecked

      delete $scope.selectedProduit[produit._id];
      $scope.removeProduit(produit);

    }
    else{
      // check-box selected
      if ( Number.parseInt(produit.model,10) >0 && Number.parseInt(produit.model,10) <= Number.parseInt(produit.max,10)){
          $scope.selectedProduit[produit._id]=produit.model;
          $scope.addProduit(produit);
          $scope.error=false;
        }
        else{
          $scope.error=true;
          produit.checkBox=false;
        }
    }
   
 };

$scope.isChecked=function(produit){
  return produit.model >0 ? true :false;
};

 $scope.addProduit=(produit)=>{
    // to be updated
    var newProduit={};
    angular.copy(produit,newProduit);
    // delete property added
    var quantite=produit.model;
    delete newProduit.model;
    delete newProduit.max;
    delete newProduit.checkBox;
    //update old property
    updateCommandeProperty(produit,true);
    // add produit
    $scope.commande.produits.push({
      'produit':newProduit,
      'quantite':quantite
    });

 };

 var updateCommandeProperty=(produit,bool)=>{
  var oldChiffreAffaire=Number.parseInt($scope.commande.chiffreAffaire);
  var oldBenefice=Number.parseInt($scope.commande.benefice);
  var oldTotalProduit=Number.parseInt($scope.commande.totalProduits);
  var quantite=Number.parseInt(produit.model,10);
  var result={};
    if(bool){
      // property increase
      $scope.commande.chiffreAffaire=oldChiffreAffaire+(quantite *produit.prixVente);
       $scope.commande.benefice=oldBenefice+ (quantite*(produit.prixVente-produit.prixAchat));
       $scope.commande.totalProduits=oldTotalProduit+quantite;
    }
    else{
      $scope.commande.chiffreAffaire=oldChiffreAffaire-(quantite *produit.prixVente);
       $scope.commande.benefice=oldBenefice- (quantite*(produit.prixVente-produit.prixAchat));
       $scope.commande.totalProduits=oldTotalProduit-quantite;
    }

 };

 $scope.removeProduit=(produit)=>{

  var indexElement=$scope.commande.produits.findIndex((obj)=>{
    return obj.produit._id===produit._id;
  });
  if (indexElement !=-1){
    $scope.commande.produits.splice(indexElement, 1);
    updateCommandeProperty(produit,false);
  }
 };

$scope.sortDetailProduit=(a,b)=>{
  if (a && b){
    var d1=new Date(a.expirationDate);
    var d2=new Date(b.expirationDate);
    return d1.getTime()-d2.getTime();
    }
  else
  return 0;
};

$scope.unSelectProduit=function(produit){

   console.log("click on the input");
   produit.checkBox=false;
   $scope.produitValueChanged(produit);
};
$scope.calculQuantiteProduit=(details)=>{
  if(details.length>1){
  return details.reduce((a,b)=>{
      return  a.quantite ? (Number.parseInt(a.quantite)+ Number.parseInt(b.quantite)): (a+ Number.parseInt(b.quantite));
  });
  }
  else{
    return details[0].quantite;
  }
};

$scope.setDefaultValue=(produit)=>{

  if (Object.keys($scope.selectedProduit).indexOf(produit._id) !=-1){
    
    return  $scope.selectedProduit[produit._id];
  }  
  return 0;
}

$scope.validateChange=function(){
    $scope.submitted=true;
    var chiffreAffaire=Number.parseInt($scope.commande.chiffreAffaire);
    var montantPayer=Number.parseInt($scope.commande.montantPayer);
    var reduction=Number.parseInt($scope.commande.reduction);
    if(Number.isNaN(reduction) || Number.isNaN(montantPayer) ||  (montantPayer> chiffreAffaire) || (reduction > chiffreAffaire)){
       $scope.errorSubmited=true;

    }
    else{
     
      $scope.errorSubmited=false;
            $scope.commande.client=$scope.selectedItem._id;
            $scope.commande.clientType=$scope.commande.client ==null ? "autre" :"abonner";

            CommandeService.create($scope.commande,function(response){
              if(response.status){
               
              //  console.log(response);
                DrugStoreService.succesRequest(response.message);
                $scope.commande=response.data.commande;

                DrugStoreService.setCurrentDailySale(response.data.dailySale);
                $state.go("home",{"selectedMenu":MENU.COMMANDE});
              }
            });

           // $scope.commande.clientType
      // launch query to database to update commande

    }
};

$scope.updateResteApayer=()=>{
    var chiffreAffaire=Number.parseInt($scope.commande.chiffreAffaire);
    var montantPayer=Number.parseInt($scope.commande.montantPayer);
     var reduction=Number.parseInt($scope.commande.reduction);
    
      if( !Number.isNaN(reduction) && !Number.isNaN(montantPayer) && (montantPayer <= chiffreAffaire)){

         $scope.resteAPayer=chiffreAffaire - reduction - montantPayer;
       }
};
$scope.imprimerFacture=()=>{
  // functionnality not added yet;
};


}]);
