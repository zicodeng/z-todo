var express = require("express");
var app = express();

var toDoController = require("./controllers/z-todo-controller");

// Set up template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// set the home page route
app.get('/', function(req, res) {
    // ejs render automatically looks in the views folder
    res.render('index');
});

// Fire controllers
toDoController(app);

// Listen to port
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000')
});
