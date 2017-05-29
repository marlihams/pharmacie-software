angular.module('core.user')
	   .factory('UserAuthService', ['$http', '$window', function($http, $window){
   var auth = {};
   auth.tokenName='drugstore-software-token';

	/**
	 * setting a token inside the localstorage
	 * @param {token} 
	*/
   auth.saveToken = function (token){
  		$window.localStorage['drugstore-software-token'] = token;
	};

	/**
	 * getting a token inside the localstorage

	*/

	auth.getToken = function (){
 	 return $window.localStorage[auth.tokenName];
	};

	/**
	 * check is a user is logged
	 * @return {boolean} 
	*/

	auth.isLoggedIn = function(){
	  var token = auth.getToken();

	  if(token){
	    var payload = JSON.parse($window.atob(token.split('.')[1]));
	   
	    return payload.exp > (Date.now());
	  } else {
	    return false;
	  }
	};

	/**
	 * getting the username of the user that's logged in
	 * @return {String} username 
	*/
	auth.currentUser = function(){
	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));
	    return payload.username;
	  }
	};

	/**
	 * post a user to /register route and saves the token returned 
	 * @param {Object} user 
	*/

	auth.register = function(user){
	  return $http.post('/register', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	/**
	 * post a user to /login route and saves the token returned 
	 * @param {Object} user 
	*/
	auth.logIn = function(user){
	  return $http.post('/login', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	/**
	 *  removes the user's token from localStorage, logging the user out.
	 * @function logout
	*/
	auth.logOut = function(){
	 $window.localStorage.removeItem(auth.tokenName);
	};
	auth.getUserId=()=>{
		if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));
	    return payload._id;
	  }
	};


  return auth;
}]);