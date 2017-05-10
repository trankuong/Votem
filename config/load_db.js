// Populate the Mongo database

db.users.drop();
db.regions.drop();

var users = [
	{
		user     : "Kuong",
		password : "$2a$10$Jj2xs.VPWTNbeZWmNv0HzuLK05HFycsqa.6Z5UFpfZw7KxJC1cHgS",
		region   : 1
	},
	{
		user     : "Leo",
		password : "$2a$10$.4DI9kO49YKIep/vDLBEX.vrP2jXQLLi2zf74ZJR92ypb6YMQSqbi",
		region   : 1
	},
	{
		user     : "jash983h32fe",
		password : "$2a$10$4Y83atsoORByg7/VI2CB1OZvanMjJLW8KdqevpwsdPg74kMp1sPcu",
		region   : 1
	},
	{
		user     : "Lsoihfoejf032o",
		password : "$2a$10$/oSBfloAAs4DSPKXagG6hO3tbVU7bC3WsFXo3WzwHSMNKiMYl7QXm",
		region   : 2
	},
	{
		// Admin.pass123
		user     : "admin",
		password : "$2a$10$R9W7bJNXcL/i2nJoU82nIOr4jwVcu9O13OCkR.d6h6o/W/1BWwRuC",
		region   : 1
	}
];

for (var each in users) {
	var entry = {
		user : users[each].user,
		password : users[each].password,
		region : users[each].region
	};
	db.users.insert(entry);
} 

db.regions.insert({
	region: 1,
	electionids: [1]
});