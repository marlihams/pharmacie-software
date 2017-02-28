angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
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
             controller:'HomeCtrl',
             resolve:{
               /* commonData:function(DrugStoreService){
                    console.log("resolve funciton");
                  return DrugStoreService.request.get();
                }*/
             }
              },
            'header@home': { 
              templateUrl: 'views/templates/header.html',
              controller:'HeaderController'
             },
             'menu@home':{
              templateUrl :'views/templates/menu.html'
             // controller:'MenuController'
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
             },
             'depenses@home':{
               templateUrl:'views/templates/menuDepenses.html',
                controller:'MenuDepense'
             }

         },
         resolve:{
           commonData:function(DrugStoreService){
                   
                  return DrugStoreService.request.get().$promise.then(function(data){
                    return data;
                  });
                },
            produitList:function(ProduitService){
              // var test=$q.defer();

              return ProduitService.getAll().$promise.then(function(data){
                return data;
              });
             
            },
            depenseList:function(){
              return null;
            },
            currentMonthDailySale:function(DailySaleService){

              return DailySaleService.getMonthDailySale().$promise.then(function(dailySales){
                return dailySales;
              });

            }


            // loading all the data from the home page.
           /* productList:function(HomeService){ //return a promise
            return $http.get('/home/produits');
            // .success(function(data){
            //         return {status:true, data:data.test};
            //       })
            //       .error(function(data,status){
            //           return {status:status,data:data};
            //       });
          }*/
        }
        })
    }]);





