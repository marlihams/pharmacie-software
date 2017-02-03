

module.exports = function(app){
  
 // app.route('/register').post(users.create);
 var Produit = require('mongoose').model('Produit');
 	var Commande= require('mongoose').model('Commande');
 	var DailySale= require('mongoose').model('DailySale');
 	var async = require("async");

app.route('/fill_database/produit').get(function(){


	var produits_data=require('../test_data/produit_data');
	Produit.remove(function(err,nbRemoved){
		if (err) {
				console.log(err);
				return null;
			}
		 console.log(nbRemoved +" has been removed from the model produit")
		Produit.create(produits_data.produitData,function(err,data){

				if (err){
					console.log("data has not been inserted");
					console.log(err);
					return null;
				}
				else{
					console.log(data.length+ " has been inserted from the table produit");
				}
		
		});


	});
	return null;
});

	
app.route('/fill_database/commande').get(function(){

	
	async.waterfall([
			function(callback){
					Commande.remove(function(err,nbRemoved){
						if (err) {
								console.log(err);
								return null;
							}
						 console.log(nbRemoved +" has been removed from the model commande");
					})
					callback(null,"one");

			}
			,function(arg1, callback){
				
				return Produit.find().exec(function(err,produits){

					if (err){
						console.log("impossible d'obtenir les produits de la base");
						console.log(err);
					}
					console.log("calling the first callback");

					callback(err,produits);
				});

			},
			function(produits,callback){
				var commandes_data=require('../test_data/commande_data').commande_data;
				produits.forEach(function(produit,index){
					var currentCommand=commandes_data[index%15];
					currentCommand.produits.push({
						"produit":produit,
						"quantite":Math.round(Math.random()*(5-1)+1)
					});

				});

				console.log("calling the last function from the waterfall");
				callback(null,commandes_data);

			},
			function(result,callback){

				Commande.create(result,function(err,data){
					if (err){
					console.log("commandes has not  been inserted from the table commande");
					console.log(err);
					return null;
					}
					
						console.log(data.length+ " has been inserted from the model commande");
						console.log(data);
					callback(null,data[0]);
				});
			}
		], function(error,firstCommande){

				if (error){
				console.log("error on dans la fonction waterfall");
					console.log(error);
					return null;
				}
				Commande.find({"_id":firstCommande._id},function(err,data){
					if (err){
					console.log("aucune commande  n'a été trouvé dans la  table commande");
					console.log(err);
					return null;
					}
					console.log("********affichage de la commande*******");
					console.log(data);
						

						console.log("********affichage des  produits de la première commande*******");
					var currentProduit;
					data[0].produits.forEach(
						function(produit,index,produits){
							currentProduit=produits.id(produit._id);
							console.log("*****produitNo:"+ (index+1)+"*******");
							console.log(currentProduit);
						});

				});
			});

});


app.route('/fill_database/dailySale').get(function(){

	
	async.waterfall([
			function(callback){
					DailySale.remove(function(err,nbRemoved){
						if (err) {
								console.log(err);
								return null;
							}
						 console.log(nbRemoved +" has been removed from the model DailySale");
					})
					callback(null,"one");

			}
			,function(arg1, callback){
				
				return Commande.find().exec(function(err,commandes){

					if (err){
						console.log("impossible d'obtenir les commandes de la base");
						console.log(err);
					}
					console.log("calling the first callback on dailySale");

					callback(err,commandes);
				});

			},
			function(commandes,callback){
				var dailySale_data=require('../test_data/dailySale_data').dailySale_data;
				commandes.forEach(function(commande,index){
					var currentDailySale=dailySale_data[index%5];
					 currentDailySale.totalProduits+=commande.produits.length;
					currentDailySale.commandes.push(commande._id);
					
				});

				console.log("calling the last function from the waterfall");
				callback(null,dailySale_data);

			},
			function(result,callback){

				DailySale.create(result,function(err,data){
					if (err){
					console.log("DailySales has not  been inserted from the table dailySale");
					console.log(err);
					return null;
					}
					
						console.log(data.length+ " has been inserted from the model dailySale");
						console.log(data);
					callback(null,data[0]);
				});
			}
		], function(error,firstDailySale){

				if (error){
				console.log("error on dans la fonction waterfall");
					console.log(error);
					return null;
				}
				DailySale.findOne({"_id":firstDailySale._id})
					.populate("commandes")
				.exec(function(err,data){
					if (err){
					console.log("aucune dailySale  n'a été trouvé dans la  table DailySale");
					console.log(err);
					return null;
					}
					console.log("********affichage de la DailySale*******");
					console.log(data);
						

						console.log("********affichage des  commandes de la première DailySale*******");
/*					var currentCommand;
*/					data.commandes.forEach(
						function(commande,index,commandes){
							console.log("*****CommandeNo:"+ (index+1)+"*******");
							console.log(commande);
						});

				});
		});

});
};