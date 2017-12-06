const logger = require('./logger');
const chalk = require('chalk');
const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = {
  requestStartedLogger: (req, res, next) => {
    logger.info([
      `${chalk.grey(`${req.method} ${req.url}`)} ${chalk.blue('started')}`,
      [
        `url=${req.url}`,
        `${Object.keys(req.headers).map(header => `${header}=${req.headers[header]}`).join(', ')}`,
        `method=${req.method}`,
        `httpVersion=${req.httpVersion}`,
        `originalUrl=${req.originalUrl}`,
      ].join(', '),
    ].join(' '));
    next();
  },
  requestFinishedLogger: expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true,
      }),
    ],
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorStatus: true,
  }),
};
