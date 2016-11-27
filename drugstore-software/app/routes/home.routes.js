


module.exports = function(app){
  var homeController = require('../controllers/home.server.controller');
 // app.route('/register').post(users.create);

 app.route('/home/produits').get(homeController.productMenu);
 app.route('/home/dailysales').get(homeController.dailysaleMenu);

};