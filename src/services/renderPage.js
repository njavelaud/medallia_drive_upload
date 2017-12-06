const logger = require('../logger');

function renderPage(req, res, next) {
	logger.debug(`Rendering page with company URL ${req.query.companyUrl}`);
	res
	.header('X-FRAME-OPTIONS', `ALLOW-FROM ${req.query.companyUrl}`)
	.render('index',{
		// Extract data from url parameters
		companyUrl: req.query.companyUrl,
		username: req.query.username,
		pwd: req.query.pwd,
	});
}

module.exports = renderPage;
