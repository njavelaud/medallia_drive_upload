const images=require('../images.json');

function renderPage(req, res, next) {
	res.render('index',{
		// Extract data from url parameters
		uploadUrl:req.query.uploadUrl,
		username:req.query.username,
		pwd:req.query.pwd,
		boxLogo:images.box,
		dropboxLogo:images.dropbox,
		gDriveLogo:images.gDrive,
		oneDriveLogo:images.oneDrive,
	});
}

module.exports=renderPage;