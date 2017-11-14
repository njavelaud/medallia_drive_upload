// Dependencies
const express=require('express');
const bodyParser = require('body-parser');
const request=require('request');
// Define routes
const routes=require('./routes/index');

const server=express();

server.use(routes);
server.set('view engine', 'hbs');

server.listen(3000, function(){
	console.log('server listening at port 3000');
});