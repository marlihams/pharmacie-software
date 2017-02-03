
var Command = require('mongoose').model('Commande');
var DailySale = require('mongoose').model('DailySale');
var Utility=require('../controllers/utilities');
var DailySaleManager=require('../manager/dailySaleManager.js');



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

	var commande=new Command(req.body);
	var dailySaleTitle=req.body.dailySaleTitle;
	/*console.log("affichage de commande");
	console.log(commande);*/

	commande.save(function(err){

		if (err){
			console.log("error while creating the Command");
			return null;
		}

		var dailySale; 
		DailySaleManager.getCurrentDailySale(function(dailySale){
		
			if (!dailySale){
				
				 	dailySale=new DailySale({
					title:dailySaleTitle? dailySaleTitle:""+(new Date()).getTime(),
					chiffreAffaire:commande.calculChiffreAffaire(),
					etat:false,
					date:Utility.getCurrentDate(),
					benefice:commande.calculBenefice(),
					totalProduits:0
				});
			}
				
			dailySale.commandes.push(commande._id);

	
			dailySale.totalProduits+=commande.produits.length;
			/*console.log("****displaying the new/old dailySale*********");
			console.log(dailySale);*/
			dailySale.save(function(err){
				if(err){
					console.log("error while saving the dailySale");
					return null;
				}
				return res.json(dailySale);
			});
		});

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

	
	// Array.prototype.push.apply(req.body.details,req.commande.details);

	 Command.findByIdAndUpdate(req.commande.id,req.body,{new:true},function(err,commande){

	 	if (err){
	 		return next(err);
	 	}
	 	else{
	 		res.json(commande);
	 	}
	 });
};




exports.deleteCommand=function(req,res,next){

	req.commande.remove(function(err,nbdeleted){

		 if (err) {
            return next(err);
        }
        else {
            res.json({
            	"deleted":nbdeleted,
            	"element":req.commande
            });
        }
	});

};

