angular.module("core.firstLetterFilter")
		.filter('FirstLetterFilter',[function($resource){
			
			return function(input){

				return input.trim().charAt(0);
			};

		}]);