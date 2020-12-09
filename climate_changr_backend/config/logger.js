const winston = require("winston");

const transports = {
  console: new winston.transports.Console({ level: 'warn' }),
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;