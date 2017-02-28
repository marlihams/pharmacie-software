angular.module("core.produit")
		.factory('ProduitService',['$resource',function($resource){
			var produitService={};
			produitService.quantity=0;
			produitService.request= $resource('/produit/:id',{id:'@_id'},{
					update:{
						method:'PUT'
					}/*,
					filter:{
						method:'GET',
						isArray:true
					}*/
				});

			/**
				  getting a produit By his Id
				 @function getProduitById
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			produitService.getProduitById=function(produitId,cb){

				produitService.request.get({id:produitId},function(produit){
					
					if (cb)
						cb(produit);
				});
			};

			/**
				  update  a  specific produit 
				 @function update
				 @params produit{Object}  the updated produit
				 @callback  cb to manage the result 
				 	@callback params  updatedProduit{Object}

			*/

			produitService.update=function(produit,cb){
				var $produitService=new produitService.request();
				$produitService._id=produit._id;
				$produitService.data=produit;

				$produitService.$update(function(updatedProduit){
					if (cb){

						cb(updatedProduit);
					}
				});


			};

			/**
				 delete a produit 
				 @function delete
				 @params produitId{String} id of the produit
				 @callback  cb to manage the result 

			*/

			produitService.delete=function(produitId,cb){
				var $produitService=new produitService.request();
				 
				if(produitId){
					$produitService._id=produitId;
					$produitService.$delete(function(dailySale){

						if (cb){
							cb(dailySale);
						}

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

			produitService.create=function(produit,cb){
				var $produitService=new produitService.request();
				 $produitService.data=produit;
				if(produit){
					$produitService.$save(function(rep){

						if (cb){
							cb(rep);
						}

					});
				
				}
			};
				/**
				  getting all product
				 @function getAll
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			produitService.getAll=function(cb){

				var produits=produitService.request.query(function(produits){
					
					if (cb)
						cb(produits);
				});

				return produits;
			};

			return produitService;

		}]);