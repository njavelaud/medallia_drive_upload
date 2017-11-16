function renderPage(req, res, next) {
	res.render('index',{
		// Extract data from url parameters
		uploadUrl:req.query.uploadUrl,
		username:req.query.username,
		pwd:req.query.pwd,
	});
}

module.exports=renderPage;