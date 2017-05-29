
module.exports = function(app){
 
  var DepenseManager=require('../manager/depenseManager.js');
  var UserManager=require('../manager/userManager.js');
 // app.route('/register').post(users.create);

 

 app.post('/depense/*',function(req,res,next){
	// middleware for post query without any data.
 
	if (Object.keys(req.body).length==0){
		console.log("the body cant not be empty on a post request");
		return res.status(500).send("the body cant not be empty on a post request");
	}
	else{
		//calling the next middleware
		next();
	}

	});

app.route('/depense/*').all(UserManager.populatedUser);
  app.route('/depense/:depenseId')
  .get(DepenseManager.getUniqueDepense)
  .put(DepenseManager.updateDepense);

/*function(req,res,next){
    console.log("update depense route");
      var userId=req.body.data ? req.body.data.userId :req.body.userId;
      console.log("userId "+ userId);
      if(userId){
        UserManager.userByID(req,res,next,userId);
      }

  },*/

app.route('/depense').post(DepenseManager.create);
app.route('/depense').get(DepenseManager.filterDepense);

 app.param('depenseId',DepenseManager.findDepenseById);
 

};