
const express = require('express');
var argv = require('minimist')(process.argv.slice(2));
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// create express app
const app = express();
var subpath = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// swagger setup
app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('dist'));
swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});

// serve swagger html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// **********************
// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Configure the API port
var port = 3000;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);


swagger.configure(applicationUrl, '1.0.0');
// **********************

// allow cros orgin for angular app
app.use(function(req, res, next) {    
    var allowedOrigins = ["http://localhost:3000", "http://localhost:4200"];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }

    //res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Require routes
require('./app/routes/book.routes.js')(app);
require('./app/routes/phone.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

// Connecting to the database
mongoose.connect(dbConfig.url, { promiseLibrary: require('bluebird') })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});