var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require("express-session");

// Database model
// var mongoose = require("mongoose");
var userModel = require("../models/user-model");

module.exports = function(app) {
	app.use(session({secret: "asdDFGfsdSFDGfgvw345435623sdfaA2G", resave: false, saveUninitialized: true}));

	app.get("/todo/user", function(request, response) {
		// Check if session has the user object
		if(!request.session.user) {
			// If not, send error message
			response.render("index");
		} else {
			// If yes, sent username to front-end
			var username = request.session.user.username;
			response.send({username: username});
		}
	});

	// Get dynamic route based on logged in user
	app.get("/todo/user/:username", function(request, response) {
		// Check if session has the user object
		if(!request.session.user) {
			// If not, send error message
			response.render("index");
		} else {
			// If yes, render todo page and sent username
			response.render("todo");
		}
	});

	app.post("/sign-up", urlencodedParser, function(request, response) {
		var username = request.body.username;
		var password = request.body.password;
		var firstName = request.body.firstName;
		var lastName = request.body.lastName;

		var newUser = new userModel();
		newUser.username = username;
		newUser.password = password;
		newUser.firstName = firstName;
		newUser.lastName = lastName;

		newUser.save(function(error, user) {
			if (error) {
				// Send error to front-end to handle
				console.log(error);
				response.send({error: error});
			} else {
				// Store this user into session
				request.session.user = user;
				console.log("Sign up");

				// Route has to be dynamic
				// It is changing based on which user is logged in
				var route = "/todo/user/" + username;
				response.send({redirect: route});
			}
		});
	});

	app.post("/log-in", urlencodedParser, function(request, response) {
		var username = request.body.username;
		var password = request.body.password;

		userModel.findOne({
			username: username,
			password: password
		}, function(error, user) {
			if(error) {
				throw error;
				response.status(500).send();
			} else if(!user) {
				// If no such user found in our database
				response.send({error: "No such user found. Please sign up first."});
			} else {
				// If user found in our database, store its info in session
				request.session.user = user;

				console.log(request.session.user);

				// Route has to be dynamic
				// It is changing based on which user is logged in
				var route = "/todo/user/" + username;
				response.send({redirect: route});
			}
		});
	});

	// Log out
	app.get("/log-out", function(request, response) {
		// Destroy session and clear cookie
		console.log("Log out");
		request.session.destroy();

		// Redirect user to home page
		response.send({redirect: "/"});
	});
}
