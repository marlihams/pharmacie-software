angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('commande-details', {
          url: '/commande/details/:commandId',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("commande details state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          views:{
            '':{
              templateUrl:"views/commandes.details.html",
              controller:'CommandeDetailsController',
            },
            'header@commande-details': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
          },
          
         resolve:{
          
            currentCommand:function($stateParams,CommandeService){

              return CommandeService.getCommandById($stateParams.commandId.trim())
              .$promise.then(function(commande){
                console.log("resolve dans currentCommand");

                  return commande;
              });

            }

        }
        })
        .state('commande-edit', {
          url: '/commande/edit/:commandId',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("commande edit state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
            views:{
            '':{
              templateUrl:"views/commandes.edit.html",
            controller:'CommandeEditController',
            },
            'header@commande-edit': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
          },
          resolve:{
          
            currentCommand:function($stateParams,CommandeService){

              return CommandeService.getCommandById($stateParams.commandId.trim())
              .$promise.then(function(commande){
                console.log("resolve dans currentCommand");

                  return commande;
              });

            },
            produitList:function(ProduitService){

              return ProduitService.getAll().$promise.then(function(data){
                return data;
              });
             
            },
            clientList:function(){
              return null;
            }
          }
        })
        .state('commande-new', {
          url: '/commande/create',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("commande edit state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
            views:{
            '':{
              templateUrl:"views/commandes.new.html",
            controller:'CommandeNewController',
            },
            'header@commande-new': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
          },
          resolve:{
            produitList:function(ProduitService){

              return ProduitService.getAll().$promise.then(function(data){
                return data;
              });
             
            },
            clientList:function(){
              return null;
            }
          }
        });
    }]);





