// server.js: Main Program

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db         = require('./db');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 3036;        // set our port

db.connect(function ConnectionHandler(err){
    if (err){
        console.log('Unable to connect to MySQL');
        process.exit(1);
    }
    console.log("Connection to MySQL Successful");
});



// ROUTES FOR OUR API
// =============================================================================
app.all('/api', function HandleAll(request, response, next){
    console.log(request.connection.remoteAddress);
    next();
});

var router = require('./friends-router.js');         // get an instance of the express Router

app.use(express.static('public'));




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Connected on port ' + port);
