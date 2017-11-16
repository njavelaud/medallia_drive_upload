// Dependencies
const request=require('request');
//const request_promise=require('request-promise');
// Load image db (i.e. data uri)
const images=require('../images.json');

function uploadFile(req, res, next) {
	// Extract data from submitted form
	var uploadUrl=req.body.uploadUrl;
	var username=req.body.username;
	var pwd=req.body.pwd;
	var fileUrl=req.body.fileUrl;
	var oauthToken=req.body.oauthToken;
	
	console.log('uploadUrl:'+uploadUrl);
	console.log('username: '+username);
	console.log('pwd:'+pwd);
	console.log('fileUrl:'+fileUrl);
	console.log('oauthToken:'+oauthToken);

	// Simplistic call
	//request.get(fileUrl).pipe(request.post(uploadUrl+"?"+username));

	// Get file from provided url...
	request
		.get(fileUrl)
		//.auth(username, null, true, oauthToken)
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
					statusIcon:images.failure,
					statusMessage:"Could not upload the file. Please try again later or reach out to your administrator"
				});
			})
			.on('response', function(response){
				console.log(response);
				res.render('status',{
					// Extract data from url parameters
					uploadUrl:uploadUrl,
					username:username,
					pwd:pwd,
					statusIcon:images.success,
					statusMessage:"File uploaded"
				});
			})
		)
	;

	/* Deprecate --> should not use promises to avoid memory leaks
	// Make call to relevant exchange API
	options = {
		url: fileUrl,
		method: 'GET',
	};
	request_promise(options)
	// If Market data collection is successful
	.then(function (file) {
		console.log(uploadUrl+"?"+username);
		 options_2 = {
			url: uploadUrl+"?"+username,
			body: file,
			method: 'POST',
			json: true
		};

        return file.pipe(request_promise(options_2));
	})
	.then(function (parsedBody) {
		res.send(parsedBody);
	})
	.catch(function (err) {
        console.log('Error:' + err);
    });
    */
}
module.exports=uploadFile;