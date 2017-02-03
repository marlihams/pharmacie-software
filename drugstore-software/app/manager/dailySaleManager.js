var DailySale = require('mongoose').model('DailySale');
var Utility=require('../controllers/utilities');

/**

	@function getWeeklyDailySales
	get the dailySales of the current week 
	@param {callback} mandatory callback to manage the dailySales of the week  

*/

exports.getWeeklyDailySales=function(callback){


	var week=Utility.getCurrentWeekInterval();


	DailySale.find({date:{'$gte':week.beginWeek,'$lte':week.endWeek}}).sort({date:-1})
			.populate("commandes").exec(function(err,dailysales){

				if(err){
					//gestion erreur 
					console.log("error has been found on getWeeklyDailySales");
					console.log(err);
				//  return res.status(400).json({message: 'error while getting the commandes'});;
				}
			//	console.log(dailysales);
			console.log("rep getWeeklyDailySales");
			console.log(dailysales);
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



exports.getCurrentDailySale=function(callback){
	var date=Utility.getCurrentDate();

	return DailySale.findDailySaleByDate(date,callback);
}

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

	res.json(req.dailySale);
};



exports.create=function(req,res){

// dailysale should be created on creating a new Command

};

/**
* getting a  specific number of  dailysale from the newest
* @function getDailySaleMonth 
* @params {Request} req  req should have a value for req.body.quantity
* @params {Response} res

*/

exports.getLotsOfDailySales=function(req,res,next){

	console.log("function getLotsOfDailySales :"+ req.body.quantity);
	
		DailySale.find().sort("-date").limit(Number.parseInt(req.body.quantity,10))
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
* getting a dailySale between two date.
* @function filterDailySale 
* @params {Request} req  req should have a value for req.body.beginDate
* @params {Response} res

*/

exports.filterDailySale=function(req,res){

		var beginDate= new Date(req.body.beginDate);

		var endDate=new Date(req.body.endDate);
		beginDate.setHours(0,0,0);
		endDate.setHours(0,0,0);

		DailySale.find({date:{'$lte':endDate,'$gte':beginDate}}).sort("-date")
		.populate("commandes")
		.exec(function(err,dailysales){

			if (err){
				 console.log("error on function filterDailySale");
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


	console.log("updating the user having the _id : "+req.dailySale.id);
	var keyToUpdate=[];


	 DailySale.findByIdAndUpdate(req.dailySale.id,req.body,{new:true},function(err,dailySale){

	 	if (err){
	 		return next(err);
	 	}
	 	else{
	 		res.json(dailySale);
	 	}
	 });
};





