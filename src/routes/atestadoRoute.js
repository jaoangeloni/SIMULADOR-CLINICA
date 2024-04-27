const express = require('express');
const router = express.Router();

const atestado = require('../controller/atestadoController');


router.post('/novo', atestado.create);
router.delete('/delete/:id', atestado.delete);


module.exports = router;
