var Produit = require('mongoose').model('Produit');
var Utility=require('../controllers/utilities');


/**
* function for getting all the product 
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


function getAllProduit(callback){
 
	Produit.find().exec(function(err,produits){

		if (err){

			console.log("error on getAllProduit function");
			console.log(err);
			return null;
		}

		if(callback)
			callback(produits);
		
	});

};

exports.getAllProduit= getAllProduit;

/**
* function for getting all the product 
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


exports.getAll=function(req,res){
  getAllProduit(function(produits){
  		res.json(produits);
  });
};





/**
* function for creating  a new product  
* @function getAllProduit 
* @params {Request} req
* @params {Response} res
*/


exports.create=function(req,res,callback){


	console.log(req.body);
	console.log("display Produit");
	var produit=new Produit(req.body.data? req.body.data:req.body);
	console.log(produit);

	produit.save(function(err,prod){

		if (err){
			console.log("error while creating the produit");
			console.log(err);
			return null;
		}
		return res.json(prod);
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
	
	console.log("function findProduitById");
    Produit.findOne({
            _id: id
        }).exec(
        function(err, produit) {
            if (err) {
            	console.log("error on function findProduitById");
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

	res.json(req.produit);
};


exports.updateProduit=function(req,res){
	// findProduitById is called automatically

	console.log("updating the product having the _id : "+req.produit.id);

	var updatedProduit=req.body.data ? req.body.data : req.body;
	
	// Array.prototype.push.apply(req.body.details,req.produit.details);

	 Produit.findByIdAndUpdate(req.produit.id,updatedProduit,{new:true},function(err,produit){

	 	if (err){
	 		return next(err);
	 	}
	 	else{
	 		res.json(produit);
	 	}
	 });
};




exports.deleteProduit=function(req,res,next){

	req.produit.remove(function(err,nbdeleted){

		 if (err) {
            return next(err);
        }
        else {
            res.json(req.produit);
        }
	});

};

