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
		user     : "Bob",
		password : "$2a$10$5xKjkgV8RTzVIiMaI05wXu2B3tjA9xauAJlBmqX.dAbK5AP1XbeGS",
		region   : 1
	},
	{
		user     : "Joe",
		password : "$2a$10$FqCWOs881VPR5r8sfV.qxOY7wIIx4.ELBDRNMJvXG5t.r.rqCgdHq",
		region   : 1
	},
	{
		user     : "Mark",
		password : "$2a$10$cCL44KHaPFfY7j3nBQurcO2JnM6zTVKn9lExJOs/8/ToNyjM.vUBS",
		region   : 1
	},
	{
		user     : "Tom",
		password : "$2a$10$dSj4s19BuzJb6pDXtNtpJ.FYFp5smkLs2pJ2LQsPaCdnh6Ja0NbpW",
		region   : 1
	},
	{
		user     : "test",
		password : "$2a$10$EiOkSvK82RyM7/TXChZHuO58euKCSfTpMuVjZueqI0iToZtqFuojq",
		region   : 1
	},
	{
		user     : "test1",
		password : "$2a$10$sWB0KhbEHg8G8U35PsaZ4e7ALvEjNmg4pp2nzcmODEjFeIeb1A9se",
		region   : 1
	},
	{
		user     : "test2",
		password : "$2a$10$2orC.GwYXg9vUJYNdNm6y.KPi17SIuHWA/v8Q0KEQfNNafZkufsVi",
		region   : 1
	},
	{
		user     : "test3",
		password : "$2a$10$iR7ThMwjM0FWq1TzNpFNHOgoV4xpBxGC5rRjO3PWiEgp6X.GDUff2",
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