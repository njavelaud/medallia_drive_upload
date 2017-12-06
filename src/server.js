const logger = require('./logger');
const expressLogger = require('./express-logger');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const routes = require('./routes/index');

const serverPort = process.env.PORT || 3000;

logger.debug('Bootstrapping Express');
const server = express();
server.use(expressLogger.requestStartedLogger);
server.use(expressLogger.requestFinishedLogger);
server.use(express.static('src/static'));
server.use(routes);
server.set('views', `${__dirname}/views`);
server.set('view engine', 'hbs');

logger.silly(`Binding Express to ${serverPort}`);
server.listen(serverPort, () => {
  logger.info(`Express server listening on port ${serverPort} in ${server.settings.env} mode`);
});

//Snipet to keep heroku alive
const keepAliveIntervalMsec = 20 * 60 * 1000;
setInterval(() => request.get('https://medallia-drive-upload.herokuapp.com/'), keepAliveIntervalMsec);
