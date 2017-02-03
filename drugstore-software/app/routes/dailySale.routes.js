
module.exports = function(app){
  var HomeController = require('../controllers/home.server.controller');
  var DailysaleManager=require('../manager/DailysaleManager.js');
 // app.route('/register').post(users.create);

 app.route('/homeData').get(HomeController.getHomeData);
 

 app.post('/dailySale/*',function(req,res,next){
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


  app.route('/dailySale/:dailySaleId')
  .get(DailysaleManager.getUniqueDailySale)
  .put(DailysaleManager.updateDailySale);
 // app.route('/dailySale/:dailySaleId/command').post(DailysaleManager.addCommand);

/* app.route('/dailySale/produits').get(homeController.productMenu);
*/
app.route('/dailySales/quantity').get(DailysaleManager.getLotsOfDailySales);
app.route('/dailySales/filterDailySale').get(DailysaleManager.filterDailySale);


 app.param('dailySaleId',DailysaleManager.findDailySaleById);
 

};