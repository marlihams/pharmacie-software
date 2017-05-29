var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
	 	require('../models/utilisateur.js'),
	 	require('../models/produit.js'),
	 	require('../models/commande.js'),
	 	require('../models/dailySale.js');
	 	require('../models/depense.js');
	 	
    var db = mongoose.connect(config.db);
	
    return db;
};