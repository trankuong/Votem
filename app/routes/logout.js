var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
			console.log("logout?");
		}
		else res.status(200).json({success: "Logged out"});
	});
});

module.exports = router;