var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://zicodeng:zicodeng@ds113670.mlab.com:13670/heroku_z3mzm8z0");

// Create a schema (blueprint for data), so our database knows what kind of information it is getting
var zTodoSchema = new mongoose.Schema({
	item: String
});

// Create a database model
// P1: model name which will be stored in MongoDB
// P2: schema name the MongoDB will be using
var zTodoModel = mongoose.model("z-todo", zTodoSchema);

module.exports = function(app) {
	// Get data from MongoDB and pass it to the view
	app.get("/z-todo", function(request, response) {

		// Find method can find all items or particular items in that collection
		// If an empty object is passed as parameter, it will retrieve all the items in that collection
		zTodoModel.find({}, function(error, data) {
			if(error) {
				throw error;
			} else {
				// Respond with a view (z-todo.ejs) and pass data to that view so it can be displayed
			    response.render("z-todo", {toDoList: data});
			}
		});
	});

	// Get data from the view and update it to our database
	app.post("/z-todo", urlencodedParser, function(request, response) {

		// Pass the new item from request (client) to our MongoDB model
		var newTodoItem = zTodoModel(request.body, zTodoSchema).save(function(error, data) {
			if (error) {
				throw error;
			} else {
			    // Respond with updated data
			    response.json(data);
			}
		});
	});

	// Delete an item from MongoDB
	app.delete("/z-todo/:item", function(request, response) {

		// Find the item deleted by user and then remove it in our MongoDB
		zTodoModel.find({item: request.params.item.replace(/\-/g, " ")}).remove(function(error, data) {
			if (error) {
				throw error;
			} else {
			    // Respond with updated data
			    response.json(data);
			}
		});
	});
}
