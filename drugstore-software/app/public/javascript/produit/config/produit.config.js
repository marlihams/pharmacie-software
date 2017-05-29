angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('produit-edit', {
          url: '/produit/edit/:produitId',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("home state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          views: {
            '': {
             templateUrl: 'views/produit.edit.html',
             controller:'ProduitEditController',
              },
            'header@produit-edit': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
         },
         resolve:{
           produit:function($stateParams,ProduitService,DrugStoreService){
               
               return ProduitService.getProduitById($stateParams.produitId.trim(),(produit)=>{
                  return produit;
               },(error)=>{
                   DrugStoreService.displayErrorPage(error);
               });
          }

        }
        })
        .state('produit-new', {
          url: '/produit/new',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("home state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }
             }],
          views: {
            '': {
             templateUrl: 'views/produit.new.html',
             controller:'ProduitNewController',
              },
            'header@produit-new': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
         },
         resolve:{
           globalInfo:function(ProduitService,DrugStoreService){
               
              return ProduitService.getGlobalInfo((data)=>{
                return data;
              },(error)=>{
                  DrugStoreService.displayErrorPage(error);
                
              });
          },
          bestSaleProduit:function(ProduitService){
            return null;

          }

        }
        });
    }]);





