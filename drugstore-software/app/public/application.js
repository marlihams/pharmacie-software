
//var drugStore=angular.module('drugStoreSoftware',['ui.router','ngAnimate','userAuth','core','drugStorecomponent','home','controller.template']);


angular.module('drugStoreSoftware').config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pharmacie-paris', {
      url: '/pharmacie-paris',
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'UserAuthService', function($state, auth){
        if(auth.isLoggedIn()){
          console.log("user logged");
          $state.go('home',{"selectedMenu":MENU.PRODUIT});
        }
        else{
          console.log("authentification failed");
        }
      }]
    })
   
  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'AuthCtrl',
    onEnter: ['$state', 'UserAuthService', function($state, auth){
      if(auth.isLoggedIn()){
        $state.go('home',{"selectedMenu":MENU.PRODUIT});
      }
    }]
  })
  .state('pharmacie-paris-error',{
    url:'/pharmacie-paris-error',
    params:{
      error:null
    },
    templateUrl:'views/error.html',
    controller:'ErrorController'
  });

  $urlRouterProvider.otherwise('pharmacie-paris');
}]);
