const express = require('express');
const router = express.Router();

const especializacao = require('../controller/especializacaoController');

router.get('/', especializacao.getAll);
router.get('/:nome', especializacao.findByName);
router.delete('/delete/:id', especializacao.delete);


module.exports = router;
