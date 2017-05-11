var express = require('express');
var router = express.Router();

var bcrypt   = require('bcrypt');
var validate = require('validator');

var Vote    = require('../models/votemodel');
var History = require('../models/historymodel');
var User    = require('../models/usermodel');
var Region  = require('../models/regionmodel');

const saltRounds = 10;

var isBlank = function(text){
	if(text == "" || text === null || text === undefined) return true;
	return false;
}

var validText = function(text){
	return (/^[0-9A-Za-z., _'()\-]+$/.test(text));
}

var validArray = function(arr){
	for(var x in arr){
		if(isBlank(arr[x])) return {status: false, message: "Ballot input should not be blank"};
		if(!validText(arr[x])) return {status: false, message: "Ballot input has characters that are not allowed"};
	}
	return {status: true};
}

// Check values and keys in the ballot to see that they are all valid
var validateForm = function(form){
	for(var key in form){
		if(!validate.isAlphanumeric(key)) return{status: false, message: "Key invalid"};
		if( Array.isArray(form[key])) {
			var x = validArray(form[key]);
			if(!x.status) return{status: false, message: x.message};
		}
		else if(typeof form[key] === "object"){
			if(validateForm(form[key]).status == false) return {status: false, message: "Ballot input has characters that are not allowed"};
		}
		else{
			if(isBlank(form[key])) return {status: false, message: "Ballot input should not be blank"};
			if(!validText(form[key])) return {status: false, message: "Ballot input has characters that are not allowed"};
		}
	}
	return {status: true};
}

router.get('/', function(req, res){
	
	sess = req.session;

	if(!sess.user) res.status(401).json({error: "Not logged in"});
	else if(!validate.isAlphanumeric(sess.user)) res.status(401).json({error: "Session username invalid"});
	else{
		var access = sess.user;
		User.find({user: access}, function(err, db_res_user){
			if(!db_res_user) res.status(422).json({error: "Username not valid"});
			
			else{
				History.findOne({user: access}, function(err, db_res){
					if(!db_res) res.status(200).json({success: "No elections voted in"});
					else res.status(200).json({electionids: db_res.electionids});
				});
			}

		});
	}
});

router.post('/:id([0-9]{1,})', function(req, res){
	sess = req.session;
	
	if(!sess.user) req.status(401).json({error: "Not logged in"});
	else if(!validate.isAlphanumeric(sess.user)) res.status(401).json({error: "Session username invalid"});
	else{
		// Check if user already voted
		History.findOne({user: sess.user}, function(err, db_hist_res){


			if(err === undefined || err === null) {
				// History found user and id already in array
				if(db_hist_res && (db_hist_res.electionids.indexOf(req.params.id) != -1) ){
					res.status(403).json({error: "Already voted in this election"});
				}

				// No history of user or id not in array
				else{
					if(!req.body.password) res.status(401).json({error: "Need password"});
					else if(!/^[0-9A-Za-z., _+=@~`\-]+$/.test(req.body.password)) res.status(401).json({error: "Password has invalid character(s)"});
					else{
						User.findOne({user: sess.user}, function(err, db_user_res){
							
							// User not in database or findOne failed
							if(!db_user_res) {
								if(err === undefined) res.status(401).json({error: "Username does not exist"});
								else{
									console.log(err);
									res.status(400).json({error: "System Error"});
								}
							}

							// Found user
							else {
								bcrypt.compare(req.body.password, db_user_res.password, function(err, result){
									
									// Bcrypt able to return a value
									if((result != null) && (!(result === undefined))){
										
										// If result is false send message
										if(!result) res.status(401).json({error: "Password incorrect"});
										else{
											Region.findOne({region: db_user_res.region}, function(err, db_region_res){
												
												// If database result is null, check if no region in system or system error
												if(!db_region_res){
													if(err === undefined) res.status(400).json({error: "System Error"});
													else res.status(401).json({error: "No elections available for your region"});
												}
												else{

													// If region for user does not have permission to submit for this electionid
													if(db_region_res.electionids.indexOf(req.params.id) == -1) res.status(404).json({error: "Access not granted"});
													
													// Has permission to submit for this election
													else{
														
														var response = validateForm(req.body.form);
														// If invalid character found, send notification
														if(!response.status) res.status(400).json({error: response.message});
														
														// Save the vote
														else {
															var hashUser = "";
															bcrypt.hash(sess.user+'~'+req.body.password, saltRounds, function(err, hash){
																if(hash) {
																	hashUser = hash;
																	var vote = new Vote({
																		hash       : hashUser,
																		electionid : req.params.id,
																		entry      : req.body.form
																	});

																	// Save to database
																	vote.save(function(err, db_vote_res){
																		if(db_vote_res){

																			// Add elections user voted in if no previous
																			if(db_hist_res === null){
																				var history = new History({
																					user        : sess.user,
																					electionids : [req.params.id]
																				});
																				history.save(function(err, db_add_hist_res){
																					if(db_add_hist_res) res.status(200).json({electionids: db_add_hist_res.electionids});
																					else {
																						console.log(err);
																						res.status(400).json({error: "System Error"});
																					}
																				});
																			}

																			// Update elections user has already voted in
																			else{
																				var newIds = db_hist_res.electionids;
																				newIds.push(req.params.id);
																				History.findOneAndUpdate({user: sess.user}, {electionids: newIds}, function(err, db_update_hist_res){
																					if(db_update_hist_res) res.status(200).json({electionids: newIds});
																					else{
																						console.log(err);
																						res.status(400).json({error: "System Error"});
																					}
																				});
																			}
																		}	

																		// If save of ballot to database fails
																		else res.status(400).json({error: "System Error"});
																	});
																}
																else{
																	console.log(err);
																	res.status(400).json({error: "System Error"});
																}
															});
														}
													}
												}
											});
										}
									}

									// Bcrypt failed
									else res.status(400).json({error: "System Error"});
								});
							}
						});
					}
				}
			}

			// Mongoose search failure in history
			else{
				console.log(err);
				res.status(400).json({error: "System Error"});
			}
		});
	}
});

// If election id is not a number
router.post('/*', function(req, res) {
	res.status(400).json({error: "Invalid election id"});
});

module.exports = router;