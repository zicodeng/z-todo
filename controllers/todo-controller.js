var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var userModel = require("../models/user-model");

module.exports = function(app) {
	// Get data from MongoDB and send JSON to front-end
	// Only retrieve data that belong to that specific user
	app.get("/todo/user/:username/api", function(request, response) {

		// Get username so we need which user is sending the request
		var username = request.params.username;
		console.log(username + " is logged in");

		// Only find data that belong to that specific user
		userModel.findOne({username: username}, function(error, data) {
			if(error) {
				throw error;
			} else {

				// Respond front-end with selected data (we don't want to send password to front-end)
				var user = {
					firstName: data.firstName,
					lastName: data.lastName,
					username: data.username,
					todoList: data.todoList
				}
			    response.json({json: user});
			}
		});
	});

	// Get data from the view and update it to our database
	app.post("/todo/user/:username/api", urlencodedParser, function(request, response) {
		// Get username so we know which user is sending the request
		var username = request.params.username;

		// Get data in the request
		// Construct a new object to store data in the request
		var newItem = {
			item: request.body.item,
			uid: request.body.uid
		}

		// Use MongoDB $push method to add a new item to todoList array
		var updateList = {
			$push: {
				todoList: newItem
			}
		};

		// Find the specific document (record) based on username
		userModel.update({username: username}, updateList, function(error, data) {
			if(error) {
				console.log(error);
			} else {
				response.json({json: data})
			}
		});
	});

	// Delete an item from MongoDB
	app.post("/todo/user/:username/api/:itemId", function(request, response) {
		console.log(request.params.itemId);
		// Use MongoDB $pull method to delete an item in todoList array
		// $pull means remove an item from a specific array based on query
		var updateList = {
			$pull: {
				todoList: {uid: request.params.itemId}
			}
		};

		// Find the specific document (record) based on username
		userModel.update({username: request.params.username}, updateList, function(error, data) {
			if(error) {
				console.log(error);
			} else {
				response.json({json: data})
			}
		});
	});
}
