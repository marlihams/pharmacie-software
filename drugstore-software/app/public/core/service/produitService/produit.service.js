angular.module("core.produit")
		.factory('ProduitService',['$resource','Upload','UserAuthService','DrugStoreService',function($resource,Upload,UserAuthService,DrugStoreService){
			var produitService={};
			produitService.quantity=0;
			produitService.request= $resource('/produit/:id',{id:'@_id'},{
					update:{
						method:'PUT'
					},
					info:{
						method:'GET'
					}
				});

			/**
				  getting a produit By his Id
				 @function getProduitById
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			produitService.getProduitById=function(produitId,successHandler,errorHandler){

				return produitService.request.get({id:produitId,"userId":UserAuthService.getUserId()}).$promise
				.then((rep)=>{
				 	return successHandler(rep);
				 }).catch((error)=>{
				 	return errorHandler(error);
				 });
			};

			/**
				  update  a  specific produit 
				 @function update
				 @params produit{Object}  the updated produit
				 @callback  cb to manage the result 
				 	@callback params  updatedProduit{Object}

			*/

			produitService.update=function(produit,successHandler,errorHandler){
				var $produitService=new produitService.request();
				$produitService._id=produit._id;
				$produitService.data=produit;

				$produitService.$update({"userId":UserAuthService.getUserId()})
					.then(function(produit){
						successHandler(produit);
					}).catch(function(error){
						errorHandler(error);
					});
			
			};

			/**
				 delete a produit 
				 @function delete
				 @params produitId{String} id of the produit
				 @callback  cb to manage the result 

			*/

			produitService.delete=function(produitId,successHandler,errorHandler){
				var $produitService=new produitService.request();
				 
				if(produitId){
					$produitService._id=produitId;
					$produitService.$delete({"userId":UserAuthService.getUserId()})
					.then(function(produit){
						successHandler(produit);
					}).catch(function(error){
						errorHandler(error);
					});
				
				}
			};

			/**
				 create a  new produit 
				 @function create
				 @params produitId{String} id of the produit
				 @callback  cb to manage the result 
				 	@callback params {object} othe created produit and his dailySale

			*/

			produitService.create=function(produit,successHandler,errorHandler){
				var $produitService=new produitService.request();
				 $produitService.data=produit;
				 return $produitService.$save({"userId":UserAuthService.getUserId()}).then((rep)=>{
				 	successHandler(rep);
				 }).catch((error)=>{
				 	errorHandler(error);
				 });
			};
				/**
				  getting all product
				 @function getAll
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			produitService.getAll=function(successHandler,errorHandler){

				var produits=produitService.request.query({"userId":UserAuthService.getUserId()}).$promise
				.then(function(produits){
					return successHandler(produits);
				}).catch((error)=>{
					return errorHandler(error);
				});

				return produits;
			};

			/**
				  getting global Info of product
				 @function getGlobalInfo
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			produitService.getGlobalInfo=function(successHandler,errorHandler){
				 
				return produitService.request.info({"userId":UserAuthService.getUserId(),"info":true}).$promise
				.then((response)=>{
					return successHandler(response);
				}).catch((error)=>{
					return errorHandler(error);
				});
			};
			produitService.addProduitByFile=function(obj,successHandler,errorHandler){

				return Upload.upload({
				 url: '/produit/uploadProduit?userId='+UserAuthService.getUserId(), //webAPI exposed to upload the file
                data:obj
				}).then((response)=>{
					successHandler(response);
				}).catch((error)=>{
					 if (!error.data.err_code){
					 	DrugStoreService.displayErrorPage(error);
					 }
					 else{
						errorHandler(error);
					}
				});
			};

			return produitService;

		}]);