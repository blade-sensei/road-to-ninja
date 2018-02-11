const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      prettyPrint : true,
      colorize: true,
      silent: false,
      timestamp : tsFormat
    })
  ]
});
module.exports = logger;