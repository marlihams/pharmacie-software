

var passport = require('passport');
var User = require('mongoose').model('Utilisateur');


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

	 var user = new User(req.body);
	 user.setPassword(req.body.password);
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

exports.userByID = function(req, res, next, id) {
	
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
};


exports.findUser=function(req,res){

	res.json(req.user);
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