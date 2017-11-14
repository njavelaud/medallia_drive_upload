// Dependencies
const express=require('express');
const router = express.Router();
const request=require('request');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Services
const renderPage = require('../services/renderPage');
const uploadFile = require('../services/uploadFile');

// Routing
router.get('/', renderPage);
router.post('/', uploadFile);

module.exports=router;