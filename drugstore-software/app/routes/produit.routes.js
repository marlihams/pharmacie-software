
module.exports = function(app){
 
  var ProduitManager=require('../manager/produitManager.js');
 // app.route('/register').post(users.create);
 var UserManager=require('../manager/userManager.js');

 

 app.post('/produit/*',function(req,res,next){
	// middleware for post query without any data.
 
	if (Object.keys(req.body).length==0 && req.body.data && Object.keys(req.body.data).length==0 ){
		console.log("the body cant not be empty on a post request");
		return res.status(500).send("the body cant not be empty on a post request");
	}
	else{
		//calling the next middleware
		console.log("calling next function on post request");
		next();
	}

	});

app.route('/produit/*').all(UserManager.populatedUser);
  app.route('/produit/:produitId')
  .get(ProduitManager.getUniqueProduit)
  .put(ProduitManager.updateProduit)
  .delete(ProduitManager.deleteProduit);

app.route("/produit/uploadProduit").post(ProduitManager.loadProduit);

 // app.route('/dailySale/:dailySaleId/command').post(DailysaleManager.addCommand);

/* app.route('/dailySale/produits').get(homeController.productMenu);
*/
app.route('/produit').post(ProduitManager.create);
app.route('/produit').get(ProduitManager.getAll);


 app.param('produitId',ProduitManager.findProduitById);
 

};