


module.exports = function(app){

  var CommandManager=require('../manager/commandManager.js');


 app.post('/commande/*',function(req,res,next){
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


  app.route('/commande/:commandeId')
  .get(CommandManager.getUniqueCommand)
  .put(CommandManager.updateCommand)
  .delete(CommandManager.deleteCommand);
app.route('/commande').post(CommandManager.create);
app.route('/commandes').get(CommandManager.getAllCommand);
app.route('/commandes/depanneFunction').get(CommandManager.depanneFunction);
//app.route('/commandes/filterCommande').get(CommandManager.filterCommand);


 app.param('commandeId',CommandManager.findCommandById);
 


};




	