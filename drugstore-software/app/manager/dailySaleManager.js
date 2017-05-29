var DailySale = require('mongoose').model('DailySale');
var Utility=require('../controllers/utilities');
var CommandManager=require('../manager/commandManager.js');

/**
	@function getWeeklyDailySales
	get the dailySales of the current week 
	@param {callback} mandatory callback to manage the dailySales of the week  

*/

exports.getWeeklyDailySales=function(callback){


	var week=Utility.getCurrentWeekInterval();


	DailySale.find({date:{'$gte':week.beginWeek,'$lte':week.endWeek}}).sort({date:-1})
			.exec(function(err,dailysales){

				if(err){
					//gestion erreur 
					console.log("error has been found on getWeeklyDailySales");
					console.log(err);
				//  return res.status(400).json({message: 'error while getting the commandes'});;
				}
			//	console.log(dailysales);
				callback(dailysales);

			});

};

/**

	@function bestMonthDailySale
	get the best dailySales of the current month 
	@param {callback} mandatory callback to manage the best dailySales of the month 

*/
exports.bestMonthDailySale=function(callback){
	var date=Utility.getDateFromMonth();
	return DailySale.bestMonthDailySale(date,callback);
};


/**

	@function getCurrentDailySale
	get the dailySale last dailySale
	@param {callback} mandatory callback to manage the current dailySale 

*/
exports.getCurrentDailySale=function(callback){

	var date=Utility.getCurrentDate();
		
	return DailySale.findDailySaleByDate(date,function(dailySale){

			if (dailySale){
				console.log("current dailySale");
				 console.log(dailySale);
				callback(dailySale);
			}
			else{
				// the dailySale of today has not been created yet 
				// currentDailySale== dailySale of day-1.
				
				 var yesterDay=Utility.getDateCorrectedFormat(date);
				
				 yesterDay.setDate(date.getDate()-1);
				 console.log(yesterDay);

				 DailySale.findDailySaleByDate(yesterDay,callback);
			}

	});
};

/**

	@function worstMonthDailySale
	get the worst dailySales of the current month 
	@param {callback} mandatory callback to manage the best dailySales of the month 

*/

exports.worstMonthDailySale=function(callback){
	var date=Utility.getDateFromMonth();
	return DailySale.worstMonthDailySale(date,callback);
}

/*exports.getTotalProduit=function(){
	var dailysale=
	return DailySale.getTotalProduit();
}*/



/**
* middleware for getting a DailySale from the database by id
* @function findDailySaleById 
* @params {Request} req
* @params {Response} res
* @params {function} next
* @params {objectId} id
*/

exports.findDailySaleById = function(req, res, next, id) {
	
	console.log("function findDailySaleById");
    DailySale.findOne({
            _id: id
        }).populate("commandes").exec(
        function(err, dailySale) {
            if (err) {
            	console.log("error on function findDailySaleById");
                return next(err);
            }
            else {
                req.dailySale = dailySale;
                next();
            }
        }
    );
};


/**
* function for getting a DailySale from the database by id
* @function findDailySaleById 
* @params {Request} req
* @params {Response} res
*/

exports.getUniqueDailySale=function(req,res){

	var chiffreAffaire=0;
	console.log(req.dailySale);
	/*req.dailysale.commandes.forEach(function(commande,index){
		req.dailySale.commandes[index].chiffreAffaire=commande.calculChiffreAffaire();
	//	req.dailySale.commandes[index].total=
	});
*/
	res.json(req.dailySale);
};



exports.create=function(req,res){

// dailysale should be created on creating a new Command

};

/**
* getting a  specific number of  dailysale from the more recent to the old one
* @function selectNumberOfDailySales 
* @params {Request} req  req should have a value for req.body.quantity
* @params {Response} res

*/


function selectNumberOfDailySales(req,res){
	

	console.log("function getLotsOfDailySales :"+ req.param.quantity);
	
		DailySale.find().sort("-date").limit(Number.parseInt(req.query.quantity,10))
		.populate("commandes").exec(function(err,dailySales){
 			if(err){
 				console.log("error on function getLotsOfDailySales");
 				console.log(err);
 				return null;
 			}
 			res.json(dailySales);

		});
};

/**
* getting the  dailySale between two date or a specific number of them .
* @function filterDailySale 
* @params {Request} req  req should have following parameter (beginDate and endDate) or quantity
* @params {Response} res

*/

exports.filterDailySale=function(req,res){

	 if (req.query.quantity){

	 	selectNumberOfDailySales(req,res);

	 }
	 else if (req.query.beginDate && req.query.endDate){

	 	filterDailySaleByDate(req,res);
	 }
	 else if (req.query.date){
	 		var currentDate= new Date(req.query.date);
	 			currentDate.setHours(0,0,0);
	 			DailySale.findDailySaleByDate(currentDate,function(dailySale){

	 				res.json(dailySale);
	 			});
	 }
	 else{
	 	findMonthDailySale(req,res);
	 }
		
};

/**
* getting a dailySale between two date.
* @function filterDailySaleByDate 
* @params {Request} req  req should have a params beginDate and endDate
* @params {Response} res

*/

function filterDailySaleByDate(req,res){

		var beginDate= new Date(req.query.beginDate);

		var endDate=new Date(req.query.endDate);
		beginDate.setHours(0,0,0);
		endDate.setHours(0,0,0);

		DailySale.find({date:{'$lte':endDate,'$gte':beginDate}}).sort("-date")
		.populate("commandes")
		.exec(function(err,dailysales){

			if (err){
				 console.log("error on function filterDailySaleByDate");
				 console.log(err);
				 return null;
			}
			// sending result to the client
			res.json(dailysales);
		});

};



/**
* update the daily sale with the id  in parameter
* @function updateDailySale 
* @params {Request} req  req should have a value for req.body.beginDate
* @params {Response} res

*/

exports.updateDailySale=function(req,res){
	// findDailySaleById is called automatically


	//console.log("updating the user having the _id : "+req.dailySale.id);
	

   var updateDailySale=req.body.data ? req.body.data:req.body;
   
 	CommandManager.keepCommandUpToDate(req,res,updateDailySale.deletedCommand);
    delete updateDailySale.deletedCommand;
    delete updateDailySale.date;
  // commande non deleted
   console.log("updateDailySale");
   console.log(updateDailySale);
   updateDailySale.commandes= updateDailySale.commandes !=null? updateDailySale.commandes.map(commande=>commande._id):[];


 //  updateDailySale.commandes=remainCommand;
  /* console.log("remain commande===>");
   console.log(remainCommand);
   console.log(updateDailySale);
*/
	 DailySale.findByIdAndUpdate(req.dailySale.id,updateDailySale,{new:true},function(err,dailySale){

	 	if (err){

	 		var message="echec sauvegarde des modifications !!!";
	 		res.json(Utility.buildResponse(err,message,false));

	 	}
	 		populateDailySale(dailySale,(err,populatedDailySale)=>{

	 			if(err){
					// manage the err;
					return null;	 				
	 			}
	 			var message="modifications ont été sauvegardées !!!";
	 		res.json(Utility.buildResponse(populatedDailySale,message,true));

	 		});	
	 });
};

/**
* function for populate a DailySale from the database by id
* @function populateDailySale 
* @params {DailySale} dailySale to populate
* @params {function} callback to manage the dailySale populated
 */

function populateDailySale(dailySale,callback){

	dailySale.populate("commandes",function(err,populatedDailySale){

				  					if (err){
				  						callback(err,populatedDailySale);
				  					}
				  					else
				  					callback(null,populatedDailySale);
				  				});
};
/**
* middleware for getting a DailySale from the database by id
* @function getDailySaleById 
* @params {Request} req
* @params {Response} res
* @params {function} next
* @params {objectId} id
*/

 function getDailySaleById (req, res,id,cb) {
	
	console.log("function getDailySaleById");
    DailySale.findOne({
            _id: id
        }).exec(
        function(err, dailySale) {
            if (err) {
            	console.log("error on function findDailySaleById");
                return next(err);
            }
            else {
            	if(dailySale !=null)
            		cb(dailySale);
            }
        }
    );
}



exports.deleteCommandeOnDailySale=function(req, res,commande) {

getDailySaleById(req,res,commande.dailySaleId,function(dailySale){
			        	
			        	var index=dailySale.commandes.indexOf(commande._id);
			        	console.log(index);
			        	/*console.log("******before delete*********");
			        	console.log(dailySale.commandes);*/
			        	if (index!=-1){
				        	dailySale.commandes.splice(index,1);
				        	//mise à jour des info du dailySale
				        	dailySale.totalProduits-=commande.totalProduits;
				        	dailySale.chiffreAffaire-=commande.chiffreAffaire;
							dailySale.benefice-=commande.benefice;
				  			//sauvegarde du dailySale
				  			dailySale.save(function(err,dailySale){
				  				if (err){
				  					console.log("error on saving dailySale after deleting a commande");
				  					console.log(err);
				  					return null;
				  				}
				  				dailySale.populate("commandes",function(err,populatedDailySale){

				  					if (err){
				  						console.log(err);
				  						return null;
				  					}
				  					res.json(populatedDailySale);
				  				});

				  			});
			  			}
			  			else{
			  				console.log("cette commande n'appartient a aucun dailySale");
			  			}

			        });

};


function findMonthDailySale(req,res){
  
  	console.log("findMonthDailySale");
	var date=Utility.getCurrentDate();

   
 var beginDayOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
 var lastDayOfMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
 console.log("beginDayOfMonth  " + beginDayOfMonth);
 console.log("lastDayOfMonth   "  +lastDayOfMonth);

  /*console.log("month vaut : "+ beginDayOfMonth +"year : "+lastDayOfMonth);*/
  DailySale.find({date:{'$gte':beginDayOfMonth,"$lte":lastDayOfMonth}}).sort("-date")
    .exec(function(err,dailySales){
        if (err){
            console.log("error on static function bestMonthDailySale");
            console.log(err);
            return err;
        }
       /* console.log(dailySales);*/
            res.json(dailySales);

        });
        
}
