

module.exports = function(app) {
	//the controller associated to the file
     var index = require('../controllers/indexManager');

     app.get('/', index.render);
};