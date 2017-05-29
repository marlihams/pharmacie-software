

module.exports = function(app){
  var users = require('../manager/userManager.js');
  app.route('/register').post(users.create);
  app.route('/login').post(users.read);
  app.route('/update/:userId').put(users.update);
 
  /*those two following method the user should be authenticated first before accessing it */
  app.route('/users').get(users.list).delete(users.deleteAll);
  app.route('/users/:userId').post(users.findUser)
  .put(users.update).delete(users.delete);
  
  /* route which will be called first before any route having 'userId' inside it */
  app.param('userId',users.userByID);

};

