angular.module("core.dailySale")
		.factory('DailySaleService',['$resource',function($resource){
			var dailySaleService={};
			dailySaleService.quantity=0;
			dailySaleService.request= $resource('/dailySale/:id',{id:'@_id'},{
					update:{
						method:'PUT'
					},
					filter:{
						method:'GET',
						params:{},
						isArray:true
					}
				});

			/**
				 * getting a dailySale By his Id
				 @function getDailySaleById
				 @params dailySaleId  id of the dailySale
				 @callback  cb to manage the result 

			*/

			dailySaleService.getDailySaleById=function(dailySaleId,cb){

				dailySaleService.request.get({id:dailySaleId},function(dailySale){
					if (cb)
						cb(dailySale);
					else
						return dailySale;
				});
			};

			/**
				 * getting the dailysale between two date the format of the date are yyy-MM-DD
				 @function filterDailySaleByDate
				 @params beginDate{string}  begin date of the filter
				 @params endDate{string}  end date of the filter
				 @callback  cb to manage the result 


			*/

			dailySaleService.filterDailySaleByDate=function(beginDate,endDate,cb){
				
				dailySaleService.request.filter({beginDate:beginDate,endDate:endDate},function(dailySales){
					
					if (cb){
						cb(dailySales);
					}
				});

			};

			/**
				 * getting a specific Number of DailySale
				 @function filterDailySaleByQuantity
				 @params quantity{Integer}  end date of the filter
				 @callback  cb to manage the result 

			*/
			dailySaleService.filterDailySaleByQuantity=function(quantity,cb){
				
					dailySaleService.quantity+=quantity;
				
				var dailySales=dailySaleService.request.filter({quantity:dailySaleService.quantity},function(){
					if (cb){
						cb(dailySales);
					}
				});

			};

			/**
				 getting the number of dailySale displayed
				 @function getQuantity
				 
			*/

			dailySaleService.getQuantity=function(){
				return dailySaleService.quantity;
			};

			/**
				 set the number of dailySale displayed
				 @function setQuantity
				 @params quantity{integer} 
			*/

			dailySaleService.setQuantity=function(quantity){
				dailySaleService.quantity=quantity;
			};

				/**
				 * update a specific dailySale
				 @function update
				 @callback  cb to manage the result 

			*/

			dailySaleService.update=function(dailySale,cb){
				var $dailySale=new dailySaleService.request();
				 $dailySale._id=dailySale._id;
				delete dailySale.commandes;
				 $dailySale.data=dailySale;
				$dailySale.$update(function(updateDailySale){
					
					if (cb){

						cb(updateDailySale);
					}
				});

			};

			/**
				 * get daily Sale  of the month 
				 @function getMonthDailySale
				 @callback  cb to manage the result 

			*/

			dailySaleService.getMonthDailySale=function(cb){
				var dailySales=dailySaleService.request.query(function(dailySales){

					if (cb) cb(dailySales);

					// return dailySales;
				});
				return dailySales;
			};
		

			return dailySaleService;

		}]);