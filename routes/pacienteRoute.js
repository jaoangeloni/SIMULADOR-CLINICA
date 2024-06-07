const express = require('express');
const router = express.Router();

const paciente = require('../controller/pacienteController');
const authController = require('../controller/authController');
const checkLogin = require('../middlewares/checkLogin');

router.post('/login', authController.login);


router.get('/home', checkLogin, paciente.renderHome);
router.get('/registro', paciente.renderRegistro);
router.post('/', paciente.create);
// router.get('/:id', checkLogin, paciente.renderEditar);
// router.post('/salvar', checkLogin, paciente.update);
router.get('/delete/:id', checkLogin, paciente.delete);
module.exports = router;