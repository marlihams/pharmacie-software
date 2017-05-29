angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('dailySale-details', {
          url: '/dailySale/details/:dailySaleId',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("home state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          views: {
            '': {
             templateUrl: 'views/dailySale.details.html',
             controller:'DailySaleDetailsController',
            
              },
            'header@dailySale-details': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             }
             
         },
         resolve:{
           currentDailySale:function($stateParams,DailySaleService){
                   
                  return DailySaleService.getDailySaleById($stateParams.dailySaleId)
                    .$promise.then(function(data){
                    return data;
                  });
                },
            
            }
        });
    }]);





