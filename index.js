var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var pg = require("pg");
var Regex = require("regex");

var port = process.env["PORT"];
var conString = process.env["DATABASE_URL"];
var pattern = /[A-Z0-9]+@[A-Z0-9]+\.[A-Z]{2,4}/;
var regex_email_pattern = new RegExp("[A-Z0-9]+@[A-Z0-9]+\.[A-Z]{2,4}", 'i');

var db;

pg.connect(conString, function(err, client){
	db = client;
});

// logging middleware
app.use(function(req, res, next) {

	console.log("Request at ", req.path);
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/static'));

app.get("/", function(request, response) {

	response.send("<h1>Hello World!</h1>");
});

app.post("/submit", function(request, response, next){
	console.log(request.body);
	if ( regex_email_pattern.test(request.body.email) ) {
		response.status(200).end(request.body.email + " thanks!");
	} else {
		response.status(200).end(request.body.email + " not a valid email address");
	}
	
});

app.listen(port);

    
