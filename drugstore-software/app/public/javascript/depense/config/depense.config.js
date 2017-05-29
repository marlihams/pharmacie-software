angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('depense-edit', {
          url: '/depense/edit',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("home state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          views: {
            '': {
             templateUrl: 'views/depenses.html',
             controller:'DepenseController',
            
              },
            'header@depense-edit': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             }
             
         },
         resolve:{
           depenses:function(DepenseService){
                   
                  return DepenseService.filterDepenseByDate()
                    .$promise.then(function(data){
                    return data.data;
                  });

                }
            
            }
        });
    }]);





