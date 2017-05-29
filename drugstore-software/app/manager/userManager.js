

var passport = require('passport');
var User = require('mongoose').model('Utilisateur');
var IndexManager=require('../manager/indexManager.js');
var UserManager=require('../manager/userManager.js');


/**
* create a  new user inside the database
* @function create 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/


exports.create=function(req,res,next){

	if(!req.body){
   		return res.status(400).json({message: 'Please fill out all fields'});
  	}
  	var params=req.body.data ? req.body.data:req.body;
  	console.log(params);
	 var user = new User(params);
	 user.setPassword(params.password);
	 user.save(function (err){
	    if(err){ 
	    	return next(err); }
	    return res.json({token: user.generateJWT()});
	  });
};

/**
* get a user from th database
* @function read 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/

exports.read=function(req,res,next){

	if(!req.body){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  passport.authenticate('local', function(err, user, info){

	    if(err){ return next(err); }

	    if(user){
	     return res.json({token: user.generateJWT()});
	    } else {
	      return res.status(401).json(info);
	    }
	  })(req, res, next);
};

/**
* get all user from the database
* @function list 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/


exports.list=function(req,res,next){

	User.find({},function(err,users){
		if (err)
			return next(err);
		else{
			res.json(users);
		}
	});
};

/**
* middleware for getting a user from the database by id
* @function userByID 
* @params {Request} req
* @params {Response} res
* @params {function} next
* @params {objectId} id
*/

function getUserByID(req, res, next, id) {
	

    User.findOne({
            _id: id
        },
        function(err, user) {
            if (err) {
                return next(err);
            }
            else {
                req.user = user;
                next();
            }
        }
    );
}

exports.userByID =getUserByID;

exports.findUser=function(req,res,next){

		res.json(req.user);
};

exports.populatedUser=function(req,res,next){
	console.log("****method populatedUser*******");
	if (req.user){
		return next();
	}
	else if (req.query.userId){
		// next is call inside this method
	 console.log(req.query.userId);
	return 	getUserByID(req,res,next,req.query.userId.trim());
	}
	else{
		// error page should be displayed to the user
		var err=new Error("Authorization denied !!! please contact the administrator");
  			err.status=403;
 
  		return IndexManager.error(err,req,res,next);
  			//res.redirect(500,"/pharmacie-paris-error");
	}
};


/**
* update  the information of a user inside the database
* @function update 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/


exports.update = function(req, res, next) {
	
	

	    User.findByIdAndUpdate(req.user.id, req.body,{new:true}, function(err, user) {


	        if (err) {
	            return next(err);
	        }
	        else {
	            res.json(user);
	        }
	    });
	
};

/**
* delete  a user inside the database by using his Id
* @function update 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/

exports.delete = function(req, res, next) {

    req.user.remove(function(err,nbdeleted) {

        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    });
};

/**
* delete  All the database from the database
* @function update 
* @params {Request} req
* @params {Response} res
* @params {function} next
*/

exports.deleteAll=function(req,res,next){

	User.remove({},function(err,nbDeleted){

		if (err) return next(err);
		else
			res.json({message: nbDeleted +' user has been deleted'});
	});
};