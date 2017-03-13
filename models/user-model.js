var mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://zicodeng:zicodeng@ds113670.mlab.com:13670/heroku_z3mzm8z0");

var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: {type: String},
	firstName: String,
	lastName: String,
	todoList: []
});

// Create a user collection with userSchema
module.exports = mongoose.model("user", userSchema);
