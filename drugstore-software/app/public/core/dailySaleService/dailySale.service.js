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

var commande=new Schema({
 title:String,
    client: mongoose.Schema.Types.ObjectId,
    clientType:{type:String,enum:['recommandeur','abonner']},
    payer: Boolean,
    recompense: Boolean,
    date: {type:Date, default:Date.now},
    details:[
    {
    	produit:[ProduitSchema],
    	quantite:Number
    }]



*/
		/*	var DailySaleService={

				key:false,
				data:[]
			};*/

		var DailySaleService={

				key:false,
				data:[{ //dailysale

					"title":"09/12/2016",
					"etat"	:" En cours",
					"commandes":[
								{ //commande
			            "title" : "holden",
			            "details" : [ //produtis
			            	{
			            		nom:"aspirine 500mg",
			            		quantite:2
			            	},
			            	{
			            		nom:"nivaquine 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"paracetamol 100mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"acétylsalicylique 500mg",
			            		quantite:2

			            	}

			            		]
			        },
			        { //commande
			            "title" : "1234572197",
			            "details" : [//produtis
			            	{
			            		nom:"aspirine 500mg",
			            		quantite:2
			            	},
			            	{
			            		nom:"nivaquine 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"paracetamol 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"acétylsalicylique 500mg",
			            		quantite:2

			            	}

			            ]
			        },
				]
			},
			{ //dailysale

					"title":"09/12/2016",
					"etat"	:" En cours",
					"commandes":[
								{ //commande
			            "title" : "holden",
			            "details" : [ //produtis
			            	{
			            		nom:"aspirine 500mg",
			            		quantite:2
			            	},
			            	{
			            		nom:"nivaquine 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"paracetamol 100mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"acétylsalicylique 500mg",
			            		quantite:2

			            	}

			            		]
			        },
			        { //commande
			            "title" : "1234572197",
			            "details" : [//produtis
			            	{
			            		nom:"aspirine 500mg",
			            		quantite:2
			            	},
			            	{
			            		nom:"nivaquine 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"paracetamol 500mg",
			            		quantite:2

			            	},
			            	{
			            		nom:"acétylsalicylique 500mg",
			            		quantite:2

			            	}

			            ]
			        },
				]
			}
		]
				
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
				
				 return	DailySaleService.getWeeklyDailySale().find(function(element){

					 	return element.id==dailysaleId;
					});
				};


			};


		/*	DailySaleService.totalProduit=function(dailysaleId){
					
					var total=0;
				var currentDailySale=DailySaleService.getDailySaleById(dailysaleId);
				for (var i=0, commandes=currentDailySale.commandes;)
			}*/



			return DailySaleService;

		}]);