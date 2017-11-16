// Dependencies
const express=require('express');
const bodyParser = require('body-parser');
const request=require('request');
// Define routes
const routes=require('./routes/index');

const server=express();

server.use(routes);
server.set('view engine', 'hbs');

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});

//Snipet to keep heroku alive
function wakeMeUp(){
	request.get('https://medallia-drive-upload.herokuapp.com/');
}
setInterval(function(){wakeMeUp();}, 20*60*1000);