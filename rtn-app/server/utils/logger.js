const winston = require('winston');

const tsFormat = () => {
  return new Date().toLocaleTimeString();
};
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: tsFormat,
    }),
  ],
});
module.exports = logger;
