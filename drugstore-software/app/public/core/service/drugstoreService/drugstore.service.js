angular.module("core.drugstore")
		.factory('DrugStoreService',['$resource','$state',function($resource,$state){
			var drugStoreService={};

			drugStoreService.request= $resource('/drugStore/:id');
			drugStoreService.produitList=null;
			drugStoreService.currentDailySale=null;
			drugStoreService.commandBoolean=false;
			drugStoreService.subscriber=[];
			
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
			 	$state.go("home",{},{reload:true});
			 };
			
			/**
				  getting the homeData
				 @function getHomeData
				 @params commandeId  id of the commande
				 @callback  cb to manage the result 
				 	@callback params  command{Object}

			*/

		/*	drugStoreService.getHomeData=function(){

				drugStoreService.request.get({id:commandeId},function(commande){
					
					if (cb)
						cb(commande);
				});
			};
*/


			return drugStoreService;

		}]);