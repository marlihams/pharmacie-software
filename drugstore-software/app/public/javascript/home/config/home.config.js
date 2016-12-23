angular.module('drugStoreSoftware')
    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
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
               templateUrl:'views/templates/menuClients.html'
             },
             'produits@home':{
               templateUrl:'views/templates/menuProduits.html'
             },
             'dailySales@home':{
               templateUrl:'views/templates/menuDailySales.html'
             },
             'depenses@home':{
               templateUrl:'views/templates/menuDepenses.html'
             }

         },
          resolve:{
            // loading all the data from the home page.
        /*  productList:function(HomeService){ //return a promise
            return $http.get('/home/produits');*/
            // .success(function(data){
            //         return {status:true, data:data.test};
            //       })
            //       .error(function(data,status){
            //           return {status:status,data:data};
            //       });
          }
        })
    }]);





