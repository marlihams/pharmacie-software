

 	var async = require("async");

var DailySaleManager=require('../manager/dailySaleManager.js');
var utilities=require('./utilities');
var ProduitManager=require('../manager/ProduitManager.js');
var DepenseManager=require('../manager/DepenseManager.js');


/**
* get the data for the home page
* @function getHomeData 
* @params {Request} req
* @params {Response} res
*/

exports.getHomeData=function(req,res){
	console.log("function HomeData");
	
async.parallel({
	weeklySale:function(callback){
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
	currentDailySale:function(callback){
		DailySaleManager.getCurrentDailySale(function(currentDailySale){
			console.log("function currentDailySale");
			callback(null,currentDailySale);
		});
	},
	depenseInfo:function(callback){
		DepenseManager.getDepenseInfo(req,res,function(obj){
			console.log("function getDepenseInfo");
			callback(null,obj);
		});
	}
	},function(err,results){

		console.log("****** "+results.depenseInfo+ " *********")
		if (err){
			console.log("error in getHomeData");
			console.log(err);
		}
		 if (results.depenseInfo.length==0){

		 	delete results.depenseInfo;
		 }
		return res.json(results);
	});	


};