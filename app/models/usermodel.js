var db = require('../../config/db')

var mongoose = require('mongoose');
mongoose.connect(db.url, db.login);

var Schema = mongoose.Schema;

var userschema = new Schema({
	user        : {type : String, required : true, unique : true},
	password    : {type : String, required : true},
	region      : {type : Number, required : true}
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userschema);