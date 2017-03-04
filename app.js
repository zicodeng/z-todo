var express = require("express");
var app = express();

var toDoController = require("./controllers/z-todo-controller")

// Set up template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Fire controllers
toDoController(app);

// Listen to port
app.listen(3000);
console.log("Listening to port 3000");
