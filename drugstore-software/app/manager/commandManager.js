
var Command = require('mongoose').model('Commande');
var DailySale = require('mongoose').model('DailySale');
var Utility=require('../controllers/utilities');
var DailySaleManager=require('../manager/dailySaleManager.js');
var async = require("async");

/**
* function for getting all the command  
* @function getAllCommand 
* @params {Request} req
* @params {Response} res
*/

exports.getAllCommand=function(req,res){

	Command.find().exec(function(err,commandes){

		if (err){

			console.log("error on getAllCommand function");
			console.log(err);
			return null;
		}
		res.json(commandes);
	});

};


exports.filterCommand=function(req,res){

		console.log(req.body);
		var beginDate= new Date(req.body.beginDate);

		var endDate=new Date(req.body.endDate);
		beginDate.setHours(0,0,0);
		endDate.setHours(0,0,0);

		Command.find({date:{'$lte':endDate,'$gte':beginDate}}).sort("-date")
		.populate("produits")
		.exec(function(err,commandes){

			if (err){
				 console.log("error on function filtercommandes");
				 console.log(err);
				 return null;
			}
			// sending result to the client
			res.json(commandes);
		});

};


/**
* function for creating  a new command  
* @function getAllCommand 
* @params {Request} req
* @params {Response} res
*/


exports.create=function(req,res,callback){

	var commande=new Command(req.body.data ? req.body.date: req.body);
	var dailySaleTitle=req.body.dailySaleTitle;
	commande.chiffreAffaire=commande.calculChiffreAffaire();
	commande.benefice=commande.calculBenefice();
	commande.totalProduits=commande.getTotalProduit();
	console.log("affichage de commande");
	console.log(commande);
	
		DailySaleManager.getCurrentDailySale(function(dailySale){
		
			if (!dailySale){
				
				 	dailySale=new DailySale({
					title:dailySaleTitle? dailySaleTitle:(new Date()).toDateString(),
					etat:false,
					date:Utility.getCurrentDate(),
					benefice:0,
					chiffreAffaire:0,
					totalProduits:0
				});
			}
				
			dailySale.commandes.push(commande._id);
			commande.dailySaleId=dailySale._id;
			
			dailySale.totalProduits+=commande.totalProduits;
			dailySale.chiffreAffaire+=commande.chiffreAffaire;
			dailySale.benefice+=commande.benefice;
		/*console.log("****displaying the new/old dailySale*********");
			console.log(dailySale);*/
		async.parallel({
			
			"commande":function(callback){
				commande.save(function(err){
					console.log("save commande");
					if (err){
						console.log("error while creating the Command");
							callback(err,"commande");
					}
						callback(null,commande);
				});
			},
			"dailySale":function(callback){
				console.log("save dailySale");
					dailySale.save(function(err){
						if(err){
							console.log("error while saving the dailySale");
							callback(err,"dailySale");
						}
						callback(null,dailySale);
					});
				
			}
		},
		    function(err,results){

				if (err){
					console.log(results);
					console.log(err);
					return null;
				}
				console.log("**********results*********");
				res.json(results);
			}
		);
	});

};

/**
* middleware for getting a  from the database by id
* @function findCommandById 
* @params {Request} req
* @params {Response} res
* @params {function} next
* @params {objectId} id
*/

exports.findCommandById = function(req, res, next, id) {
	
	console.log("function findCommandById");
    Command.findOne({
            _id: id
        }).exec(
        function(err, commande) {
            if (err) {
            	console.log("error on function findCommandById");
                return next(err);
            }
            else {
                req.commande = commande;
                next();
            }
        }
    );
};

/**
* function for getting a commande from the database by id
* @function findCommandById 
* @params {Request} req
* @params {Response} res

*/

exports.getUniqueCommand=function(req,res){

	res.json(req.commande);
};


exports.updateCommand=function(req,res){
	// findCommandById is called automatically

	console.log("updating the command having the _id : "+req.commande.id);

	var updatedCommand=req.body.data ? req.body.data :req.body;
	// Array.prototype.push.apply(req.body.details,req.commande.details);

	 Command.findByIdAndUpdate(req.commande.id,updatedCommand,{new:true},function(err,commande){

	 	if (err){
	 		return next(err);
	 	}
	 	else{
	 		res.json(commande);
	 	}
	 });
};




exports.deleteCommand=function(req,res,next){

		if (req.commande){
			req.commande.remove(function(err,commande){

				 if (err) {
		            return next(err);
		        }
		        else {
			       DailySaleManager.deleteCommandeOnDailySale(req,res,req.commande);
		    	}

			});
		}
		else{
			console.log("nothing to delete the commande does not exist");
		}
};


exports.depanneFunction=function(req,res){
	console.log("depanneFunction");

	Command.find().exec(function(err,commandes){

		if (err){

			console.log("error on getAllCommand function");
			console.log(err);
			return null;
		}
		async.each(
			commandes,
			function(commande,callback){

				commande.benefice=commande.calculBenefice();
				commande.chiffreAffaire=commande.calculChiffreAffaire();
				commande.totalProduits=commande.getTotalProduit();
					commande.save(function(err){

					if (err){
						console.log("error while creating the Command");
							callback(err,"commande");
					}
					else{

						callback(null);
					}
				});
		},
		function(err){

			if (err){
				console.log("an error occured on the function depanneFunction");
				console.log(err);
				return res.json({message:"depanneFunction failed"});
			}
			else{
				console.log("all the command has been updated :function depanneFunction");
				res.json({message:"depanned Function succed"});
			}
		});
		
	});

};