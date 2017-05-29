angular.module("core.drugstore")
		.factory('DrugStoreService',['$resource','$state','$mdToast',function($resource,$state,$mdToast){
			var drugStoreService={};

			drugStoreService.request= $resource('/drugStore/:id');
			drugStoreService.produitList=null;
			drugStoreService.currentDailySale=null;
			drugStoreService.commandBoolean=false;
			drugStoreService.subscriber=[];
			drugStoreService.oldSate=MENU.PRODUIT;
			
			drugStoreService.setProduits=function(produits){

				drugStoreService.produitList=produits;
			};



			drugStoreService.getProduits=function(){

				return drugStoreService.produitList;
			};


			drugStoreService.setCurrentDailySale=function(dailySale){

				drugStoreService.currentDailySale=dailySale;

				if (drugStoreService.subscriber.length >0){
					drugStoreService.notify();
				}
			};


			drugStoreService.subscribe=function(callback){

				drugStoreService.subscriber.push(callback);
			};

			drugStoreService.notify=function(){

				drugStoreService.subscriber.forEach(function(callback){
					callback();
				});
			};
			
			drugStoreService.getCurrentDailySale=function(){

				return drugStoreService.currentDailySale;
			};

			drugStoreService.hasCommand=function(){
				return drugStoreService.commandBoolean;
			};

			drugStoreService.setCommandBoolean=function(bool){

				drugStoreService.commandBoolean=bool;
			};

			drugStoreService.setOldState=function(lastState){
				if (Object.values(MENU).indexOf(lastState)!=-1){
					drugStoreService.oldSate=lastState;
				}
			};

			drugStoreService.filtreAscOrDesc=function(a,b,type){
	 
				 	if(a > b)
				 		return type==1 ? 1:-1 ;
				 else if (a<b)
				 	 return type==1 ? -1:1;
				 else
				 	return 0;
    
			};

			drugStoreService.reload=function(){

			 	console.log("reloading");
			 	$state.go("home",{"selectedMenu":drugStoreService.oldSate},{reload:true});
			 };
			
			drugStoreService.displayErrorPage=function(error){
				$state.go("pharmacie-paris-error",{error:error});
				
			};

	drugStoreService.succesRequest=function(message){
		       $mdToast.show(
		      $mdToast.simple()
		        .textContent(message)
		        .position('top right')
		        .toastClass("toast-success-class")
		        .hideDelay(3000)
		    );
	};
	drugStoreService.infoRequest=function(message){
		  $mdToast.show(
		      $mdToast.simple()
		        .textContent(message)
		        .position('top right')
		        .action('FERMER')
		        .highlightAction(true)
		        .toastClass("toast-info-class")
		        .hideDelay(6000)
		    ).then(function(rep){
		    	if (rep=="ok"){
		    		$mdToast.hide();
		    	}
		    });
	};
	drugStoreService.failedRequest=function(message){
		       $mdToast.show(
		      $mdToast.simple()
		        .textContent(message)
		        .position('top right')
		        .toastClass("toast-failed-class")
		        .hideDelay(3000)
		    );
	};

	drugStoreService.createCommand=()=>{
		return {
			title:"",
			client:null,
			clientType:"inconnu",
			montantPayer:0,
			chiffreAffaire:0,
			totalProduits:0,
			benefice:0,
			recompense:false,
			produits:[]
		};
	};
	drugStoreService.createProduit=()=>{
		return {
		    nom: "",
		    description: "",
		    prixAchat:"",
		    prixVente:"",
		    details:[{
		    	emplacement:"",
		    	expirationDate:new Date(),
		    	quantite:""
		    }]

		   };
		
	};


			return drugStoreService;

		}]);