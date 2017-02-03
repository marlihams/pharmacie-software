
module.exports = function(app){
 
  var ProduitManager=require('../manager/produitManager.js');
 // app.route('/register').post(users.create);

 

 app.post('/produit/*',function(req,res,next){
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


  app.route('/produit/:produitId')
  .get(ProduitManager.getUniqueProduit)
  .put(ProduitManager.updateProduit)
  .delete(ProduitManager.deleteProduit);
 // app.route('/dailySale/:dailySaleId/command').post(DailysaleManager.addCommand);

/* app.route('/dailySale/produits').get(homeController.productMenu);
*/
app.route('/produit').post(ProduitManager.create);
app.route('/produits').get(ProduitManager.getAll);


 app.param('produitId',ProduitManager.findProduitById);
 

};