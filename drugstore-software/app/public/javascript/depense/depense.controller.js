angular.module("depense")
.controller('DepenseController',[
	'$scope',
	'$state',
	'$filter',
	'UserAuthService',
	'DepenseService',
	'DrugStoreService',
	'depenses',
	'$mdDialog',
	function($scope,$state,$filter,UserAuthService,DepenseService,DrugStoreService,depenses,$mdDialog){

			console.log("depense view");
			
			$scope.globalDepense=[];
			$scope.bonDepense=[];
			$scope.displayedDepense={
				"type":"autre"
			};
			$scope.title="Depense du mois courant";
			$scope.typeDepense=[{
				"type":"autre",
				"selected":true
				},{
				 "type":"actionnaire",
				 "selected":false
				},{
				"type":"entreprise",
				"selected":false
				}
			];
		var updateTitle=function(){
			var title="Depense du ";
			/*title=title + $filter('date')(
				depenses[depenses.length-1].date,
				'dd/MM/yyyy'
				);
			title=title + " au "+ $filter('date')(
				depenses[0].date,
				'dd/MM/yyyy'
				);*/
		};

	var initializeObj=(depenses)=>{
	  	var totalActionnaire=0;
		var totalEntreprise=0;
		var otherDepense=0;
	
		for (var i=0;i<depenses.length;i++){

				if (depenses[i].type=="autre"){
					$scope.globalDepense.push(depenses[i]);
					otherDepense+=depenses[i].prix;

				}
				else if(depenses[i].type=="actionnaire"){
					$scope.bonDepense.push(depenses[i]);
					totalActionnaire+=depenses[i].prix;
				}
				else{
					$scope.bonDepense.push(depenses[i]);
					totalEntreprise+=depenses[i].prix;
				}
			}

			
			$scope.totalActionnaire=totalActionnaire;
			$scope.totalEntreprise=totalEntreprise;
			$scope.otherDepense=otherDepense;
			$scope.total=totalActionnaire+totalEntreprise+otherDepense;
			$scope.displayedDepense={
				"type":"autre"
			};

			// $scope.submitted=false;
			// initialize begin date end End Date:
			var deb=new Date(depenses[0].date); 
			var end=new Date(depenses[depenses.length-1].date)
			$scope.beginDate=new Date(deb.getFullYear(),deb.getMonth(),1);
			$scope.endDate=new Date(end.getFullYear(),end.getMonth()+1,0);
	};
	initializeObj(depenses);

$scope.changeSelectedDepense=function(depense){
	 $scope.submitted=false;
	if ($scope.displayedDepense._id !=depense._id){ 
		//changement de selection
		unselectRefDepense();
 	}
      
       if(depense.selected){
      		angular.copy(depense, $scope.displayedDepense); 
       }
       else{
       		// aucune depense n'est selectionnée.
       		$scope.displayedDepense={
	       		"type":"autre"
	       	};
       }
      reInitiateDepenseType();

    $scope.statusValidation=$scope.displayedDepense.validateActionnaire && $scope.displayedDepense.validateEntreprise;
};
var unselectRefDepense=()=>{

	if ($scope.displayedDepense && $scope.displayedDepense._id){
		var obj;
		obj=$scope.displayedDepense.type=="autre" ?$scope.globalDepense:$scope.bonDepense;
		var ref=obj.find((element)=>{
				return element._id==$scope.displayedDepense._id;
			});
			ref.selected=false;
	}
};

$scope.rechercheDepense=(beginDate,endDate)=>{

	DepenseService.filterDepenseByDate(
		$filter('date')($scope.beginDate,"yyyy-MM-dd"),
		$filter('date')($scope.endDate,"yyyy-MM-dd"),
		function(response){

			if (response.status){
				initializeObj(response.data);
				DrugStoreService.succesRequest(response.message);
			}

		});
	
}

$scope.validerDepense=($event)=>{
			

			$mdDialog.show({
		         parent: angular.element(document.body),
		         targetEvent: $event,
		         templateUrl:'/views/templates/validation.template.html',
		         /*locals: {
		           items: details
		         },*/
		          scope: $scope,        // use parent scope in template
          		  preserveScope: true,
		         clickOutsideToClose:true,
		         controller:function DialogController($scope,$mdDialog){
		         
		            $scope.validateDepense=()=>{
		            	var bool=$scope.displayedDepense? $scope.displayedDepense.selected : null;

					 	 if (bool){
					 	 	$scope.displayedDepense.validation=true;
					 	 	$scope.displayedDepense.validationValue=true;
					 	 	console.log("validation depense");
					 	 	$scope.update($scope.displayedDepense);
					 	 	$mdDialog.hide();
					 	 }
		            };
		            $scope.unValidateDepense=()=>{
		            	console.log("unValidateDepense");

		            	$scope.displayedDepense.validation=true;
					 	$scope.displayedDepense.validationValue=false;
					 	$scope.update($scope.displayedDepense);
					 	$mdDialog.hide();
		            };
		            $scope.closeDialog=()=>{
		            	console.log("close dialog");
		            	$mdDialog.hide();
		            };
		         }
		      });
	

 	//$scope
 		/*var bool=$scope.displayedDepense? $scope.displayedDepense.selected : null;

 	 if (bool){
 	 	$scope.displayedDepense.validation=true;
 	 	console.log("validation depense");
 	 	update($scope.displayedDepense);
 	 }*/

};
var updateGenericInfo=(obj,id)=>{
	var depenseSelected=null;
	if (obj){
		depenseSelected= obj.find((element)=>{
			return element._id===id;
		});
		if (depenseSelected){
			$scope.submitted=false;
			depenseSelected.selected=false;
			$scope.displayedDepense.selected=false;
			var oldPrice=depenseSelected.prix;
			angular.copy($scope.displayedDepense,depenseSelected);
			if (depenseSelected.type=="actionnaire"){
				 $scope.totalActionnaire-=oldPrice;
				
				$scope.totalActionnaire+=$scope.displayedDepense.prix;
			}
			if (depenseSelected.type=="entreprise"){
				 $scope.totalEntreprise-=oldPrice;
				
				$scope.totalEntreprise+=$scope.displayedDepense.prix;
			}
			if (depenseSelected.type=="autre"){
				 $scope.otherDepense-=oldPrice;
				
				$scope.otherDepense+=$scope.displayedDepense.prix;
			}
			$scope.total=$scope.otherDepense+$scope.totalActionnaire+$scope.totalEntreprise;
		}
	}
};

$scope.changeDepenseType=()=>{

	if ($scope.displayedDepense.selected){
		// cas d'une modification
		 alert("vous ne pouvez pas changer le type de la dépense");
		console.log($scope.displayedDepense.type);
		
		var previous=$scope.typeDepense.find((element)=>{
			return element.selected==true;
		});
		$scope.displayedDepense.type=previous.type;
	}
	else{
		 reInitiateDepenseType();
	}
};

var reInitiateDepenseType=()=>{
	$scope.typeDepense.forEach(function(element){

			 	element.selected= element.type===$scope.displayedDepense.type ? true:false;
		});
};

$scope.saveChangement=()=>{

		 $scope.submitted=true;

	var bool=$scope.displayedDepense? $scope.displayedDepense.selected : null;

	if (bool==true){
	// cas d'une modification
		delete $scope.displayedDepense.validation;
		//  angular.copy(depense, $scope.displayedDepense);

			$scope.update($scope.displayedDepense);
		}
	else if (bool==false){
		// cas new depense
		console.log("creation new depense");
		console.log($scope.displayedDepense);
		/*DepenseService.create($scope.displayedDepense,(rep)=>{
			if (rep){
					var message="crétion de la  depense "+depense.title " réussi !!!SUCCESS";
					initializeObj(rep);
					DrugStoreService.succesRequest(message);
			}

		});*/
	}
	else{
		// displayedDepense is empty.
		console.log("displayedDepense is empty");

	}


}

 $scope.update=function(depense){
	var userId=UserAuthService.getUserId();
	if (userId){
	depense.userId=userId;
	console.log("modification depense");
		console.log($scope.displayedDepense);
		DepenseService.update(depense,(rep)=>{
	 	 		if (rep.status){
	 	 			
	 	 			$scope.displayedDepense=rep.data;
	 	 			updateGenericInfo( rep.data.type=="autre" ? 
					$scope.globalDepense:$scope.bonDepense,
					  rep.data._id
					);
	 	 			
	 	 			$scope.displayedDepense={
	 	 				"type":"autre"
	 	 			};
		 	 			
	 	 			DrugStoreService.succesRequest(rep.message);

	 	 			
	 	 			 // make empty  field form
	 	 			
	 	 		}
	 	 		else{
	 	 			DrugStoreService.failedRequest(rep.message);
	 	 			
	 	 		}

	 	 	});
		}
	};
	
	}]);