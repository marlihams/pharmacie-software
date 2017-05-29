
var Depense = require('mongoose').model('Depense');
var Utility=require('../controllers/utilities');
var async = require("async");
var User= require('mongoose').model('Utilisateur');

exports.create=function(req,res){


	var parameter=(req.body.data ? req.body.data: req.body);
	if (parameter.date){
		parameter.date=Utility.getDateCorrectedFormat(parameter.date);
	}
	console.log(parameter);
	var depense=new Depense(parameter);

	depense.save(function(err,dpse){

		if (err){
			console.log("error while creating the depense");
			console.log(err);
			return null;
		}
		//find the depense of the month
	
		filterDepense(req,res);

	});
};


function buildUpdateDepense(req,res){

	console.log("updatedDepense");
	var dpse=req.body.data ? req.body.data : req.body;
	/*console.log("updatedDepense");
	console.log(updatedDepense);*/
	var updatedDepense={};
	if (dpse.validation){
		// c'est une validation on non un update complet
	//	updatedDepense.validateEntreprise=dpse.validateEntreprise;
	//	updatedDepense.validateActionnaire=dpse.validateActionnaire;
		if(req.user){
		
		switch(req.user.profil){

			case 'admin':

			updatedDepense.validateEntreprise=dpse.validationValue;
			break;
			case 'actionnaire':
			updatedDepense.validateActionnaire=dpse.validationValue;
			break;
			default:
			return null;
			 break;
		}

	 }
	}
	else{
		// update et non une validation
		updatedDepense=dpse;
		 updatedDepense.validateActionnaire =false;
		 updatedDepense.validateEntreprise=false;
	}
	
		console.log(updatedDepense);


	return updatedDepense;
}
exports.updateDepense=function(req,res){
	
		var updatedDepense=buildUpdateDepense(req,res);
		if (updatedDepense !=null){
		 	Depense.findByIdAndUpdate(req.depense.id,updatedDepense,{new:true},function(err,deps){

			 	if (err){
			 		//return next(err);
			 		console.log("error inside the function updateDepense");
			 		return null;
			 	}
			 	else{
			 		var message="la mise à jour de la dépense a réussi !!! ";
			 		if((deps.validateEntreprise && !deps.validateActionnaire) ||(!deps.validateEntreprise && deps.validateActionnaire)){
			 			message=message+ " Informer vos partenaires pour une validation complète";
			 		}
			 		else if (deps.validateEntreprise && deps.validateActionnaire){ 
			 		message=message+ " La dépense est validée par tous vos partenaires";
			 		}
			 		else{
			 			message=" informer vos responsables pour une validation de la dépense";
			 		}

			 		res.json(Utility.buildResponse(deps,message,true));
			 	}

			 	
	 		});
	 	}
	 	else{
	 		var message="vos droits sont insuffiants pour valider la dépense!!!";
	 		res.json(Utility.buildResponse(null,message,false));
	 	}
	 
};


var findDepenseById=function(req, res, next, id) {
	
	console.log("function findDepenseById");
    Depense.findOne({
            _id: id
        }).exec(
        function(err, depense) {
            if (err) {
            	console.log("error on function findDepenseById");
                return next(err);
            }
            else {
                req.depense = depense;
                next();
            }
        }
    );
};

exports.findDepenseById =findDepenseById;


exports.getUniqueDepense=function(req,res){

	res.json(req.depense);
};



function findDepenseMonth(req,res){
  
  	console.log("findDepenseMonth");
	var date=Utility.getCurrentDate();
   
 var beginDayOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
 var lastDayOfMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
 console.log("beginDayOfMonth  " + beginDayOfMonth);
 console.log("lastDayOfMonth   "  +lastDayOfMonth);

  /*console.log("month vaut : "+ beginDayOfMonth +"year : "+lastDayOfMonth);*/
  Depense.find({date:{'$gte':beginDayOfMonth,"$lte":lastDayOfMonth}}).sort("date")
    .exec(function(err,depenses){
        if (err){
            console.log("error on static function findDepenseMonth");
            console.log(err);
            return err;
        }
       /* console.log(depenses);*/
   
			res.json(Utility.buildResponse(depenses,"",true));
        });
        
};

function filterDepenseByDate(req,res){

		var beginDate= new Date(req.query.beginDate);

		var endDate=new Date(req.query.endDate);
		beginDate.setHours(0,0,0);
		endDate.setHours(0,0,0);

		Depense.find({date:{'$lte':endDate,'$gte':beginDate}}).sort("date")
		.exec(function(err,depenses){

			if (err){
				 console.log("error on function filterDepenseByDate");
				 console.log(err);
				 return null;
			}
			// sending result to the client
			console.log("*******depenses*******");
			console.log(depenses);
			var message="filtrage des dépenses réussi !!!"
			res.json(Utility.buildResponse(depenses,message,true));
			
		});

};
function filterDepense(req,res){
	
	if (req.query.beginDate && req.query.endDate){

	 	filterDepenseByDate(req,res);
	 }
	 else{
	 	findDepenseMonth(req,res);
	 }
		
};

exports.filterDepense=filterDepense;


exports.getDepenseInfo=function(req,res,callback){


	var profil=req.user.profil.trim();
	console.log("******profile****** "+ profil);
	var query=null;
	switch(profil){
		case 'admin':
				query={validateEntreprise:false};
			 break;
		case 'actionnaire':
		query={validateActionnaire :false};
			
			break;
		case 'superAdmin':
			query={$or:[{validateEntreprise:false},{validateActionnaire :false}]};
			break;
	}

	if (query){

		Depense.find(query).sort("date").exec(function(err,depenses){

				if (err){
					return next(err);
				}
				else{
					var beginDate=depenses[0].date;
					var endDate=depenses[depenses.length-1].date;
					
					var  message="?" +depenses.length +" ? ? du "
					 + beginDate.getDate() +"/"+(beginDate.getMonth()+1)+"/"+beginDate.getFullYear()+ " au "
					 +endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
					message=message.split(/\?/g);

					 if (profil=="superAdmin"){
					 	
					 	message[0]="Il y a ";
					 	message[2]=" depenses non validées ";
					 }
					 else{
					 	message[0]="Vous avez";
					 	message[2]=" depenses à valider ";

					 }

					return callback(message.join(" "));
				}

		});

	}
	else
		return callback("");
};