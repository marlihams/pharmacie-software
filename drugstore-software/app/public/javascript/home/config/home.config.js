angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home/:selectedMenu',
           onEnter: ['$state', 'UserAuthService', function($state, auth){
             console.log("home state");
              if(!auth.isLoggedIn()){
                console.log("connexion expired");
                 $state.go("pharmacie-paris");
              }

             }],
          views: {
            '': {
             templateUrl: 'views/home.html',
             controller:'HomeCtrl'
              },
            'header@home': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
             'menu@home':{
              templateUrl :'views/templates/menu.html',
              controller:'MenuController'
             },
             'clients@home':{
               templateUrl:'views/templates/menuClients.html',
                controller:'MenuClient'
             },
             'produits@home':{
               templateUrl:'views/templates/menuProduits.html',
                controller:'MenuProduit'
             },
             'dailySales@home':{
               templateUrl:'views/templates/menuDailySales.html',
                controller:'MenuDailySale'
             },
             'commandes@home':{
               templateUrl:'views/templates/menuCommandes.html',
                controller:'MenuCommande'
             }/*,
             'depenses@home':{
               templateUrl:'views/templates/menuDepenses.html',
                controller:'MenuDepense'
             }*/

         },
         resolve:{
           commonData:function(DrugStoreService,UserAuthService,$state){
                   
                  return DrugStoreService.request.get({"userId":UserAuthService.getUserId()}).$promise.then(function(data){
                    return data;
                  }).catch(function(error){

                  if (error.data){
                     $state.go("pharmacie-paris-error",{error:error.data});
                  }

                  });
                },
            produitList:function(ProduitService,DrugStoreService){
              // var test=$q.defer();

              return ProduitService.getAll((data)=>{
                return data;
              },(error)=>{
                  if (!error.err_code){
                    DrugStoreService.displayErrorPage(error);
                  }
              });
             
            },
            /*depenseList:function(){
              return null;
            },*/
            currentMonthDailySale:function(DailySaleService){

              return DailySaleService.getMonthDailySale().$promise.then(function(dailySales){
                return dailySales;
              });

            }

        }
        })
    }]);





