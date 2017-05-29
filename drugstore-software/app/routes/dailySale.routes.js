
module.exports = function(app){
  var HomeController = require('../controllers/home.server.controller');
  var DailysaleManager=require('../manager/dailysaleManager.js');
  var UserManager=require('../manager/userManager.js');
  var IndexManager=require('../manager/indexManager.js');
 // app.route('/register').post(users.create);

 app.route('/drugStore').get(UserManager.populatedUser,HomeController.getHomeData);
 

 app.post('/dailySale/*',function(req,res,next){
	// middleware for post query without any data.
 
	if (Object.keys(req.body).length==0){
		console.log("the body cant not be empty on a post request");

		var err=new Error("Internal ERROR !! the body cant not be empty on a post request!!! please contact the administrator");
  			err.status=500;
 
  			IndexManager.error(err,req,res,next);
	//	return res.status(500).send("the body cant not be empty on a post request");
	}
	else{
		//calling the next middleware
		next();
	}

	});

// before any request starting by /dailySale user has to be authenticated first
app.route('/dailySale/*').all(UserManager.populatedUser);

  app.route('/dailySale/:dailySaleId')
  .get(DailysaleManager.getUniqueDailySale)
  .put(DailysaleManager.updateDailySale);
 // app.route('/dailySale/:dailySaleId/command').post(DailysaleManager.addCommand);

/* app.route('/dailySale/produits').get(homeController.productMenu);
*/
app.route('/dailySale').get(DailysaleManager.filterDailySale);
 // app.route('/dailySale').get(DailysaleManager.findMonthDailySale);

 app.param('dailySaleId',DailysaleManager.findDailySaleById);
 

};