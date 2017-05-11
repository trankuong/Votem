var express = require('express');
var router = express.Router();

var Vote    = require('../models/votemodel');
var History = require('../models/historymodel');

var addToTotals = function(tot, ballot){
	for(var key in ballot){
		
		if(Array.isArray(ballot[key])) {
			// Create object if none
			if(!tot[key]) tot[key] = {};
			
			for(var item in ballot[key]) {
				if(!tot[key][ballot[key][item]]) tot[key][ballot[key][item]] = 1;
				else tot[key][ballot[key][item]] += 1;
			}
		}

		else if(typeof(ballot[key]) == 'object') {
			// Create object if none
			if(!tot[key]) tot[key] = {};

			for(var x in ballot[key]){
				if(!tot[key][x]) tot[key][x] = [ballot[key][x]];
				else tot[key][x].push(ballot[key][x]);
			}
		}

		else {
			// Create object if none
			if(!tot[key]) tot[key] = {};
			
			if(!tot[key][ballot[key]]) tot[key][ballot[key]] = 1;
			else tot[key][ballot[key]] += 1;
		}
	}
}

// Can either get all the json objects
// Or have a seperate table to keep track of current tally

// Check route has id as numbers
router.get('/:id([0-9]{1,})', function(req, res){

	sess = req.session;

	if(!sess.user) res.status(401).json({error: "Need to be logged in"});
	else{
		History.findOne({user: sess.user}, function(err, db_hist_res){
			
			// Database issue
			if(err){
				console.log(err);
				res.status(400).json({error: "System Error"});
			}
			
			// User has no history, so hasn't voted yet
			else if(!db_hist_res) res.status(401).json({error: "You may not yet access the results"});
			
			else{
				// If election id is not in their history, do no grant access to view current polls
				if(db_hist_res.electionids.indexOf(req.params.id) == -1) res.status(401).json({error: "You may not yet access the results"});
				
				else{
					
					var totals = {};
					
					Vote.find({electionid: req.params.id}, function(err, db_res){
						if(err){
							console.log(err);
							res.status(400).json({error: "System Error"});
						}
						else{
							for(var submission in db_res) {
								addToTotals(totals, db_res[submission]['entry']);
							}
						}
						res.status(200).json({voteCounts: totals});
					});
				
				}
			
			}
		});
	}


});

// If election id is not a number
router.get('/*', function(req, res) {
	res.status(404).json({error: "Invalid election id"});
});

module.exports = router;