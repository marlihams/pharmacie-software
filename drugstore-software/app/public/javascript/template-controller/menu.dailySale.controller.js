angular.module("controller.template")
.controller('MenuDailySale',[
	'$scope',
	'$state',
	'UserAuthService',
	'DrugStoreService',
	'DailySaleService',
	'currentMonthDailySale',
	'$filter',
	function($scope,$state,UserAuthService,DrugStoreService,DailySaleService,currentMonthDailySale,$filter){

		 //do smthing else
		 console.log("MenuDailySale");
		 console.log(currentMonthDailySale);

		DailySaleService.setQuantity(currentMonthDailySale.length);
		
		 $scope.dailySales=currentMonthDailySale;

		 $scope.title="ventes journalières";

		$scope.myDateEnd=new Date();
		$scope.maxDate=new Date();
		
		 $scope.filtreDailySale=function(key,type){
		 /*	type= type ? Number.parseInt(type):1;
		if(key){
			$scope.dailySale.sort((a,b)=>{



				if (key=="date"){
				 d1=new Date(a.date);
				 d2=new Date(b.date);
					return DrugStoreService.filtreAscOrDesc(d1.getTime(),d2.getTime(),type);
				}
				else{
					// tri selon le chiffreAffaire ou benefice ou totalProduits
					return DrugStoreService.filtreAscOrDesc(Number.parseInt(a[key]),
										Number.parseInt(b[key]),
										type
										);
				}
				
			});
		}
		else{

			 console.log("key of tri is mandatory");
		}
*/
	};
	
		 $scope.rechercheDailySale=function(form){
		 	
		 	$scope.submitted=true;
		 
			 	 if (form.$valid) {

			 	 	DailySaleService.filterDailySaleByDate(
			 	 			$filter('date')($scope.myDateDebut,"yyyy-MM-dd"),
			 	 			$filter('date')($scope.myDateEnd,"yyyy-MM-dd"),
			 	 			function(dailySales){
			 	 				 $scope.dailySales=dailySales;
			 	 			}
			 	 		);

  			 }
		 };

		 $scope.showDailySaleDetails=function(dailySale){

		 	$state.go("dailySale-details",{dailySaleId:dailySale._id});
		 };

		 $scope.displayMoreDailySale=function(){

		 	if ($scope.dailySales.length<60){
		 		DailySaleService.setQuantity($scope.dailySales.length);

		 		DailySaleService.filterDailySaleByQuantity(
		 			15,
		 			function(dailySales){

		 				$scope.dailySales=dailySales;
		 			});
		 	}
		 	else{
		 		console.log(" displaying too much dailySales not allowed");
		 	}

		};

	}]);