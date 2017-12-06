const winston = require('winston');

winston.addColors({
  silly: 'magenta',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  debug: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  error: 'red',
});

function getLogger() {
  const transports = [
    new winston.transports.Console({
      colorize: true,
      level: 'debug',
    }),
  ];

  const logger = new winston.Logger({
      exitOnError: false,
      exceptionHandlers: [
        new winston.transports.Console({
          colorize: true,
          json: true,
        }),
      ],
      transports,
    });

  return logger;
}

module.exports = getLogger();
