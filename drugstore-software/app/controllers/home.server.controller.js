

 	var async = require("async");

var DailySaleManager=require('../manager/dailySaleManager.js');
var utilities=require('./utilities');
var ProduitManager=require('../manager/ProduitManager.js');


/**
* get the data for the home page
* @function getHomeData 
* @params {Request} req
* @params {Response} res
*/

exports.getHomeData=function(req,res){
	console.log("function HomeData");
	
async.parallel({
	weekDailySale:function(callback){
		DailySaleManager.getWeeklyDailySales(function(dailySales){
			
			callback(null,dailySales);
	});

	},
	bestMonthDailySale:function(callback){
	
		DailySaleManager.bestMonthDailySale(function(bestMonthDailySale){
			console.log("function bestMonthDailySale");

			callback(null,bestMonthDailySale);
		});
	},
	worstMonthDailySale:function(callback){
	
		DailySaleManager.worstMonthDailySale(function(worstMonthDailySale){
			console.log("function bestMonthDailySale");

			callback(null,worstMonthDailySale);
		});
	},
	produits:function(callback){

		ProduitManager.getAllProduit(function(produits){

				callback(null,produits);
		});
	
	},
	currentDailySale:function(callback){
		DailySaleManager.getCurrentDailySale(function(currentDailySale){
			console.log("function currentDailySale");
			callback(null,currentDailySale);
		});
	}
	},function(err,results){

		if (err){
			console.log("error in getHomeData");
			console.log(err);
		}
		 
		/*console.log("function results");
		console.log(results);*/
		return res.json(results);
	});	


};