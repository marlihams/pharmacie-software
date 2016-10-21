// exports the developpement.js file on dev mode
module.exports = require('./env/' + process.env.NODE_ENV + '.js');