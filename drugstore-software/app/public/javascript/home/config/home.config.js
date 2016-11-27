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
        });
    }]);





