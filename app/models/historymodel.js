var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historyschema = new Schema({
	user        : {type : String, required : true},
	electionids : {type : [Number], required : true}
});

module.exports = mongoose.model('History', historyschema);