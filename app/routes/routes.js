module.exports = function(app) {
	
	app.get('/', function(req, res){

		// get the session
		sess = req.session;
		
		res.sendfile('./public/templates/index.html');
	
	});

	// Load main page
	app.get('*', function(req, res){
		res.redirect('/');
	});
};