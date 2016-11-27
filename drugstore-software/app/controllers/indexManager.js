

/* GET home page. */
exports.render = function(req, res) {
	// displaying the index.ejs page
	console.log ("je suis passé par cette fonction");
    res.render('index', { title: 'Pharmacie-Paris'});
};