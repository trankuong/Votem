var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regionschema = new Schema({
	region        : {type : Number, required : true},
	electionids   : {type : [Number], required : true}
});

module.exports = mongoose.model('Region', regionschema);