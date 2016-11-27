var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
	 	require('../models/utilisateur.js'),
	 	require('../models/produit.js'),
	 	require('../models/commande.js'),
	 	require('../models/dailySale.js');
	 	// require('../models/.js'),
	 	// require('../models/.js'),
	 	// require('../models/.js'),
	 	// require('../models/.js'),
	 	// require('../models/.js'),
	 	// require('../models/.js'),
	 	// require('../models/.js'),

    var db = mongoose.connect(config.db);
	// var user=require('../models/utilisateur');
	// var user2=require('./models/utilisateur');
	// var user3=require('../app/models/utilisateur');
	// var user3=require('../app/models/utilisateur');
//var user3=require('./utilisateur.js');

    return db;
};