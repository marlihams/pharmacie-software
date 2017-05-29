var Produit = require('mongoose').model('Produit');
var Utility=require('../controllers/utilities');
 	const async = require("async");
 	const xlstojson = require("xls-to-json-lc");
	const xlsxtojson = require("xlsx-to-json-lc");
	const fs = require('fs');
	const FIELD_NAME=[];
	const MESSAGE=require('../manager/messageManager.js')();

  var multer = require('multer');
   var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var fileName=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            // keep in ref the name of the FILE
            FIELD_NAME.push(fileName); 
            //console.log("****New FileName**** "+ fileName);
            cb(null, fileName);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                    	var fileName=file.originalname.split('.')[file.originalname.split('.').length-1];
                        
                       console.log("***********function fileFilter******  "+fileName);

                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');


/**
* function for getting all the product 
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


function getAllProduit(req,res){
 
	Produit.find().exec(function(err,produits){

		if (err){

			//console.log("error on getAllProduit function");
			//console.log(err);
			err.status(500);
			return res.json({err_code:0,status:false,message:MESSAGE.M1+MESSAGE.M2,stack:err.stack});
		}
		return res.json(produits);
	 
		
	});

};


function getGlobalProductInfo(req,res){
 	var date=new Date();

	async.parallel({
		yearExpiration:function(callback){
			
			var beginYear=new Date(date.getFullYear(),0,1);
			var endYear=new Date(date.getFullYear(),11,31);
		
		Produit.find({'details.expirationDate':{'$gte':beginYear,'$lte':endYear}}).sort("date").exec((err,results)=>{

				callback(err,results);
		});
	
		},
		expired:function(callback){
			var today=Utility.getDateCorrectedFormat(date);
			Produit.count({'details.expirationDate':{'$lte':today}},function(err,results){

				callback(err,results);
			});

		},
		produits:function(callback){
			Produit.find({},function(err,results){

				callback(err,results);
			});
		}
		
	}, function(err,results){
		
		if (err){

			res.status(500);
			return  res.json({err_code:0,status:false,message:MESSAGE.M1+MESSAGE.M2,stack:err.stack});
		}
		else{

			results.nbProduit=results.produits.length;
			
			results=setStockProduitParameter(results);
			delete results.produits;
			var beginDayOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
 			var lastDayOfMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
 
			var monthExpiration=results.yearExpiration.filter(
					(produit)=>{
				return produit.details.expirationDate
						<=beginDayOfMonth && 
						produit.details.expirationDate >=lastDayOfMonth;

			});

			results.monthExpiration=monthExpiration.length;
			results.yearExpiration=results.yearExpiration.length;
			return res.json(results);
		}

	});
	
};

function setStockProduitParameter(results){
	var nbstock=0;
	var outOfStock=0;
	results.produits.forEach((produit)=>{
		if (produit.details.length >1){
			produit.details.forEach((detail)=>{
				if (detail.quantite){
					nbstock+=detail.quantite;
				}
				else{
					outOfStock++;
				}
			});
		}
		else{
			if (produit.details[0].quantite){
				nbstock+=produit.details[0].quantite;
			}
			else{
				outOfStock++;
			}
		}	
	});
	results.nbstock=nbstock;
	results.outOfStock=outOfStock;
	return results;
}

exports.getAllProduit= getAllProduit;

/**
* function for getting all the product 
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


exports.getAll=function(req,res){
	var info=req.query.info;
	if (info){
		getGlobalProductInfo(req,res);
	}
	else{
	  getAllProduit(req,res);
  }
};





/**
* function for creating  a new product  
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


exports.create=function(req,res,callback){


	//console.log(req.body);
	//console.log("display Produit");
	var produit=new Produit(req.body.data? req.body.data:req.body);
	//console.log(produit);

	produit.save(function(err,prod){

		if (err){
			//console.log("error while creating the produit");
			//console.log(err);
			res.status(500);
			return  res.json({err_code:1,status:false,message:MESSAGE.M3+MESSAGE.M4,stack:err.stack});

		}

	 	 return res.json(Utility.buildResponse(produit,MESSAGE.M5+prod.nom+MESSAGE.M6+MESSAGE.M7,true));
		 
	});

};

/**
* middleware for getting a  from the database by id
* @function findProduitById 
* @params {Request} req
* @params {Response} res
* @params {function} next
* @params {objectId} id
*/

exports.findProduitById = function(req, res, next, id) {
	
	//console.log("function findProduitById");
    Produit.findOne({
            _id: id
        }).exec(
        function(err, produit) {
            if (err) {
            	//console.log("error on function findProduitById");
                return next(err);
            }
            else {
                req.produit = produit;
                next();
            }
        }
    );
};

/**
* function for getting a Produit from the database by id
* @function findProduitById 
* @params {Request} req
* @params {Response} res

*/

exports.getUniqueProduit=function(req,res){

	return res.json(req.produit);
};


exports.updateProduit=function(req,res,next){
	// findProduitById is called automatically

	//console.log("updating the product having the _id : "+req.produit.id);

	var updatedProduit=req.body.data ? req.body.data : req.body;
	/*if (updatedProduit.expirationDate){
		updatedProduit.expirationDate=Utility.getDateCorrectedFormat(updatedProduit.expirationDate);
	}
	//console.log(updatedProduit);*/
	// Array.prototype.push.apply(req.body.details,req.produit.details);


	 Produit.findByIdAndUpdate(req.produit.id,updatedProduit,{new:true},function(err,produit){

	 	if (err){
	 		res.status(500);
	 		return  res.json({err_code:1,status:false,message:MESSAGE.M9+MESSAGE.M2,stack:err.stack});

	 	}
	 	else{
	 		
	 	res.json(Utility.buildResponse(produit,MESSAGE.M8,true));

	 	}
	 });
};




exports.deleteProduit=function(req,res,next){

	req.produit.remove(function(err,produit){

		 if (err) {
		 	//console.log(err);
		 	res.status(500);
            return  res.json({err_code:1,status:false,message:MESSAGE.M10+MESSAGE.M2,stack:err.stack});

        }
        else {
	 		return res.json(Utility.buildResponse(produit,MESSAGE.M5 + produit.nom +MESSAGE.M16+MESSAGE.M7,true));
        }
	});

};
exports.updateProduitQuantite=function(produitArray){
	produitArray.forEach(function(element){

		 Produit.findOne({
            _id: element.produit._id
        }).exec(
        function(err, produit) {
            if (err) {
            	//console.log("error on function updateProduitQuantite");
                return err;
            }
            else {
	          	produit.details.forEach(function(details){
	          		if (details._id==element.produit.details[0]._id){
	          			details.quantite=Number.parseInt(details.quantite)-Number.parseInt(element.quantite);
	          		}
	          	});
	          	//console.log("produit updated");
	          	//console.log(produit);
	          	produit.save();
            }
        }
    );

	});

};

exports.loadProduit=function(req,res){

	 //console.log("***********function loadProduit***********");

	 var exceltojson; //Initialization
        upload(req,res,function(err){
            if(err){
                 //console.log(err);
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
            	
                //console.log("No file passed");
                res.status(500);
             return   res.json({err_code:1,status:false,message:MESSAGE.M11,stack:err.stack});
 
               
            }
            //start convert process
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
            	//console.log("req.file.path===>"+req.file.path);
                exceltojson({
                    input: req.file.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:false
                }, function(err,result){
                    if(err) {
                    	//console.log("Erro occured on exceltojson");
                    	res.status(500);
                    return   res.json({err_code:0,status:false,message:MESSAGE.M12,stack:err.stack});

                    } 
                    //console.log("*****display content of the file****");
                   var produits=buildProduct(result);
                   //console.log(produits);
                   // implement method to  insert  all the produit of the file
                   insertProduits(req,res,produits);
                });
            } catch (e){
            	//console.log("an error has been catched");
            	//console.log(e);
            	res.status(500);
               return res.json({err_code:0,status:false,message:MESSAGE.M13+MESSAGE.M14,stack:e.stack});

            }
        });

};


function buildProduct(data){
  var produitName={};
  var produitData=[];
 
  var expirationDate;
  var position;
data.forEach((element)=>{
  expirationDate=element.expirationDate.split("-");
  if(element.nom in produitName){

    // recuperation du produit et mise à jour des infos du produit.
    var produit=produitData[produitName[element.nom]];
    produit.details.push({
      "emplacement":element.emplacement,
      "quantite":element.quantite,
      "expirationDate":expirationDate[2]+"-"+expirationDate[1]+"-"+expirationDate[0]
    });
    produit.prixAchat=Math.max(produit.prixAchat,element.prixAchat);
    produit.prixVente=Math.max(produit.prixVente,element.prixVente);
  }else{
    
   var produit={
    "nom":element.nom,
    "description":element.description,
    "prixAchat":element.prixAchat,
    "prixVente":element.prixVente,
    "details":[{
      "emplacement":element.emplacement,
      "quantite":element.quantite,
      "expirationDate":expirationDate[2]+"-"+expirationDate[1]+"-"+expirationDate[0]
    }]
  };
    produitName[element.nom]=(produitData.push(produit)-1);
  }

});
	return produitData;
}

/**
* function for insering an array of product  
* @function insertProduits 
* @params {Request} req
* @params {Response} res
*/


function insertProduits(req,res,produitArray){

 if (produitArray){
	Produit.create(produitArray,function(err,prod){

		if (err){
			//console.log(err);
			
			//rename the name of the file 
			//FIELD_NAME
			//console.log ("******NOM DES FICHIERS*****");
			//console.log(FIELD_NAME);
			//rename file to added failed.
			addFailedToFileTitle(req,res);
				res.status(500);
			return res.json({err_code:0,status:false,message:MESSAGE.M3,stack:err.stack});

		}
	 	return res.json({status:true,message:MESSAGE.M15+MESSAGE.M7,data:prod});

	});
 }

}

function addFailedToFileTitle(req,res){

			var newTitle;
			FIELD_NAME.forEach((fileTitle,index)=>{
				newTitle=fileTitle.split(".");
				newTitle.splice(newTitle.length-2,0,"failed");
				newTitle=newTitle.join(".");
				fs.rename(fileTitle, newTitle, function(err) {
			    	if ( err ){
			    		//console.log('ERROR: ' + err);
			    		res.status(500);
			    	return res.json({err_code:0,status:false,message:MESSAGE.M16,stack:err.stack});
	
			    	}
				});

			});
			FIELD_NAME.splice(0);

}
