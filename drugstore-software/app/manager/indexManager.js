

/* GET home page. */
exports.render = function(req, res) {
	// displaying the index.ejs page
	console.log ("***je suis passé par cette fonction**");
    res.render('index', { title: 'Pharmacie-Paris'});
};

exports.error=function(err,req,res,next){

	console.log("********redirect to error page********");
	next(err);
	//res.status(500).render('error',{"error":err});
};