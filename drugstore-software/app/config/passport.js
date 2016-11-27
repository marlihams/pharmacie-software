

 var typeAuth=require('./env/global.variable')();
module.exports = require('./strategy/' + process.env.auth + '.js');