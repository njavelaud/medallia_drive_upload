// Dependencies
const request=require('request');

function uploadFile(req, res, next) {
	// Extract data from submitted form
	var uploadUrl=req.body.uploadUrl;
	var username=req.body.username;
	var pwd=req.body.pwd;
	var fileUrl=req.body.fileUrl;
	var oauthToken=req.body.oauthToken;

	// Get file from provided url...
	request
		.get(fileUrl)
		.auth(null, null, true, oauthToken)
		// Log errors
		.on('error', function(err) {
			console.log(err)
		})
		// ... then post the file obtained to the relevant webfeed
		.pipe(request
			.post(uploadUrl+"?"+username)
			// Log errors
			.on('error', function(err) {
				console.log(err)
				res.render('status',{
					// Extract data from url parameters
					uploadUrl:uploadUrl,
					username:username,
					pwd:pwd,
					statusIcon:"failure",
					statusMessage:"Could not upload the file. Please try again later or reach out to your administrator"
				});
			})
			.on('response', function(response){
				//console.log(response);
				res.render('status',{
					// Extract data from url parameters
					uploadUrl:uploadUrl,
					username:username,
					pwd:pwd,
					statusIcon:"success",
					statusMessage:"File uploaded"
				});
			})
		)
	;
}
module.exports=uploadFile;