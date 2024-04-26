const express = require('express');
const router = express.Router();

const exame = require('../controller/exameController');


router.post('/novo', exame.create);
router.delete('/delete/:id', exame.delete);


module.exports = router;
