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
        .state('commande.edit', {
          url: '/commande/edit/:commandId',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("commande edit state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          templateUrl:"views/commande.edit.html",
          controller:'CommandeEditController',
         resolve:{
          
            currentCommand:function($staeParams,CommandeService){

             /* return DailySaleService.getMonthDailySale().$promise.then(function(dailySales){
                return dailySales;
              });*/

            }

        }
        })
    }]);





