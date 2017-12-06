const logger = require('../logger');
const request = require('request');

function uploadFile(req, res, next) {
	const { companyUrl, username, pwd, fileUrl, oauthToken } = req.body;

	// Get file from provided url...
	request
		.get(fileUrl)
		.auth(null, null, true, oauthToken)
		// Log errors
		.on('error', (err) => {
			logger.error(`Unable to get source file: ${err}`);
		})
		// ... then post the file obtained to the relevant webfeed
		.pipe(request
			.post(`${companyUrl}.feed?${username}`)
			// Log errors
			.on('error', function(err) {
				logger.error(`Unable to post file to feed: ${err}`);
				res.render('status',{
					// Extract data from url parameters
					companyUrl,
					username,
					pwd,
					statusIcon: 'failure',
					statusMessage: 'Could not upload the file. Please try again later or reach out to your administrator',
				});
			})
			.on('response', (response) => {
				res
				.header('X-FRAME-OPTIONS', `ALLOW-FROM ${companyUrl}`)
				.render('status', {
					// Extract data from url parameters
					companyUrl,
					username,
					pwd,
					statusIcon: 'success',
					statusMessage: 'File uploaded',
				});
			})
		);
}

module.exports=uploadFile;
