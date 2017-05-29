

module.exports = function(app) {
	//the controller associated to the file
     var indexManager = require('../manager/indexManager');

     app.get('/', indexManager.render);
     app.get('/pharmacie-paris-error',indexManager.error);
};