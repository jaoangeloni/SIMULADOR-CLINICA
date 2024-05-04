const express = require('express');
const router = express.Router();

const paciente = require('../controller/pacienteController');

const checkLogin = require('../middlewares/checkLogin');

router.get('/login', paciente.renderLogin);
router.post('/login', paciente.login);

router.get('/', checkLogin, paciente.getAll);
router.get('/novo', paciente.renderNovo);
router.post('/', paciente.create);
router.get('/:id', checkLogin, paciente.renderEditar);
router.post('/salvar', checkLogin, paciente.update);
router.get('/delete/:id', checkLogin, paciente.delete);

module.exports = router;