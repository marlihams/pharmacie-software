angular.module("core.depense")
		.factory('DepenseService',['$resource','UserAuthService',function($resource,UserAuthService){
			var depenseService={};
			depenseService.quantity=0;
			depenseService.request= $resource('/depense/:id',{id:'@_id'},{
					update:{
						method:'PUT'
					},
					filter:{
						method:'GET',
						params:{},
						isArray:false
					}
				});

			/**
				  getting a depense By between two date or the depense of the current month
				 @function filterDepenseByDate
				 @params beginDate 
				  @params endDate 
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}

			*/

			depenseService.filterDepenseByDate=function(beginDate,endDate,cb){
			
				return depenseService.request.filter({beginDate:beginDate,endDate:endDate,"userId":UserAuthService.getUserId()},function(depenses){
					
					if (cb){
						cb(depenses);
					}
				});

			};


			/**
				  update  a  specific depense 
				 @function update
				 @params produit{Object}  the updated produit
				 @callback  cb to manage the result 
				 	@callback params  updatedDepense{Object}

			*/

			depenseService.update=function(depense,cb){
				var $depenseService=new depenseService.request();
				$depenseService._id=depense._id;
				$depenseService.data=depense;

				$depenseService.$update({"userId":UserAuthService.getUserId()},function(updatedDepense){
					if (cb){

						cb(updatedDepense);
					}
				});


			};

			/**
				 create a  new depense 
				 @function create
				 @params commandId{String} id of the depense
				 @callback  cb to manage the result 
				 	@callback params {object} the  depense of the month 

			*/

			depenseService.create=function(depense,cb){
				var $depenseService=new depenseService.request();
				 $depenseService.data=depense;
				if(depense){
					$depenseService.$save({"userId":UserAuthService.getUserId()},function(rep){

						if (cb){
							cb(rep);
						}

					});
				
				}
			};

			/**
				 delete a produit 
				 @function delete
				 @params produitId{String} id of the produit
				 @callback  cb to manage the result 

			*/

			/*depenseService.delete=function(produitId,cb){
				var $depenseService=new depenseService.request();
				 
				if(produitId){
					$depenseService._id=produitId;
					$depenseService.$delete(function(dailySale){

						if (cb){
							cb(dailySale);
						}

					});
				
				}
			};*/

			/**
				 create a  new produit 
				 @function create
				 @params produitId{String} id of the produit
				 @callback  cb to manage the result 
				 	@callback params {object} othe created produit and his dailySale

			*/

			/*depenseService.validate=function(userId,cb){
				var $depenseService=new depenseService.request();
				 $depenseService.data=userId;
				if(userId){
					$depenseService.$save(function(rep){

						if (cb){
							cb(rep);
						}

					});
				
				}
			};*/
				/**
				  getting all product
				 @function getAll
				 @params produitId  id of the produit
				 @callback  cb to manage the result 
				 	@callback params  produit{Object}


			depenseService.getAll=function(cb){

				var produits=depenseService.request.query(function(produits){
					
					if (cb)
						cb(produits);
				});

				return produits;
			};

			*/

			return depenseService;

		}]);