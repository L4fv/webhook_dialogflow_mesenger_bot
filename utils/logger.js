const winston = require("winston");

const tsFormat = () =>
  `${new Date().toLocaleDateString("en-US", {
    timeZone: "America/Lima"
  })} - ${new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Lima"
  })}`;

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: tsFormat
    })
  ]
});
