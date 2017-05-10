// Login database access
var express = require('express');
var validate = require('validator');
var bcrypt = require('bcrypt');

var router = express.Router();

var User = require('../models/usermodel');

router.get('/', function(req, res){
	sess = req.session;
	if(sess.user){
		res.json({success: "Already logged in"});
	}
	else{
		res.json({error: "Not logged in"});
	}
});

router.post('/', function(req, res){

	sess = req.session;

	console.log(req.body);

	// If logged in already, don't need to relog in
	if(sess.user) res.status(200).json({success: "Already logged in"});

	else{
		console.log("not logged in");
		if(!req.body.user || (req.body.user === undefined) || 
			 !req.body.password || (req.body.password === undefined) || 
			 !req.body || (req.body === undefined)) res.status(401).json({error: "Need username and password"});
		else if(!validate.isAlphanumeric(req.body.user)) res.status(400).json({error: "Username may only consist of letters and numbers"});
		// Check for valide characters in password
		else if(!(/^[0-9A-Za-z., _+=@~`-]+$/.test(req.body.password))) res.status(400).json({error: "Password has non-allowed character"});
		else{

			console.log("before user find");


			// Check to see if user in system
			User.findOne({user: req.body.user}, function(err, db_res){
				console.log("returned");
				if(!db_res) {
					if(err === undefined) res.status(422).json({error: "Username does not exist"});
					else{
						console.log(err);
						res.status(400).json({error: "System Error"});
					}
				}
				else {
					
					// Chech password is correct
					bcrypt.compare(req.body.password, db_res.password, function(err, result) {
						if(result) {
							
							// Record user of session
							sess.user = req.body.user;
							
							// Set cookie to expire in 20 minutes
							sess.cookie.maxAge = 1200000;
							
							res.status(200).json({success: "proceed"});
						}
						else {
							if(err === undefined) res.status(422).json({error: "Password incorrect"});
							else{
								console.log(err);
								res.status(400).json({error: "System Error"});
							}
						}
					});
				
				}
			});
		
		}
	}
	
});

module.exports = router;