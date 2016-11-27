
//setting the variable NODE_ENV 
/*
 the value node_env has to be changed on production mode 
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.secretName=process.env.SECRET_NAME || 'drugStoreSoftware';


var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express');
var db=mongoose();
var passport=require('./config/passport');
var app = express();

//var passport=passport();
app.listen(config.port);
module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);