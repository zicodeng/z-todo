var express = require("express");
var app = express();

var todoController = require("./controllers/todo-controller");

// Set up template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// set the home page route
app.get('/', function(request, response) {
    // ejs render automatically looks in the views folder
    response.render('index');
});

// Fire controllers
todoController(app);

// Listen to port
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000')
});
