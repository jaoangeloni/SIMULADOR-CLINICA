const express = require('express');
const router = express.Router();
const errorHandlingRoute = require('../controller/errorController');


router.get('*', errorHandlingRoute.renderError);


module.exports = router;
