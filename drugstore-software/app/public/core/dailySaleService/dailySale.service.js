angular.module("core.dailySale")
		.factory('DailySaleService',['$resource',function($resource){


/*
			var DailySaleSchema = new Schema({
    title:String,
    chiffreAffaire: Number,
    etat: Boolean,
    benefice: Number,
    date: {type:Date,default:Date.now},
    commandes:[
    {
    	type:mongoose.Schema.Types.ObjectId,
    	ref:"Commande"
    }]
});
*/
			var DailySaleService={

				key:false,
				data:[]
			};
			 
			DailySaleService.request=function(){


				return $resource('dailysale/:id',{},{
					query:{
						method:'GET',
						params:{menu:''},
						isArray:true
					}
				});


			};
			DailySaleService.enableServerCall=function(){
				DailySaleService.key=true;
			};


			DailySaleService.disableServerCall=function(){
				DailySaleService.key=false;
			};


			/**
			  * @funciton getWeeklyDailySale
	 		  * getting the data  for the Menu "mes produits"

			*/
			DailySaleService.getWeeklyDailySale=function(cb){

				if (DailySaleService.data.length==0 || DailySaleService.key){

					var dialysales=DailySaleService.request().query(function(){
						DailySaleService.data.push(dialysales);
						DailySaleService.key=false;
						if (cb){
							cb();
						}
						return DailySaleService.data;
					});
				}
				else{
					return DailySaleService.data;
				}
			};

			/**
			  * @funciton getDailySaleCommande
	 		  * getting the commande of a dailySale

			*/
			DailySaleService.getDailySaleCommande=function(dailysaleId){
				
				var currentDailySale=DailySaleService.getDailySaleById(dailysaleId);
					return  currentDailySale != undefined ? currentDailySaleService.commandes : null;

			};


			/**
			  * @funciton getDailySaleData
	 		  * getting the data  for the Menu "mes produits"

			*/
			DailySaleService.getDailySaleById=function(dailysaleId){

				var lookCommand=function(){
				
				 return	DailySaleService.data.find(function(element){

					 	return element.id==dailysaleId;
					});
				};

				if (DailySaleService.data.length==0 || DailySaleService.key){

					DailySaleService.getWeeklyDailySale(lookCommand);
				}
				else{

					 return lookCommand();
				}

			};

			return DailySaleService;

		}]);