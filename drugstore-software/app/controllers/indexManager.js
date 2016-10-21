

/* GET home page. */
exports.render = function(req, res) {
	// displaying the index.ejs page
    res.render('index', { title: 'Express' });
};