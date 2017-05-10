var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteschema = new Schema({
	hash       : {type : String, required : true},
	electionid : {type : Number, required : true},
	entry      : {type : Schema.Types.Mixed, required : true}
});

module.exports = mongoose.model('Vote', voteschema);