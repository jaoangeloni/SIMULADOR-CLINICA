const express = require('express');
const router = express.Router();

const medico = require('../controller/medicoController');
const checkLogin = require('../middlewares/checkLogin');
const authController = require('../controller/authController');

router.post('/login', authController.login);
router.get('/login', medico.renderLogin);
//router.post()
router.get('/home', checkLogin, medico.renderHome);
router.get('/todos', authController.verificarToken, medico.getAll);
router.get('/especializacaoid/:especializacaoid', medico.findBySpecId);
router.post('/novo', medico.create);
//router.get('/:id', checkLogin, medico.renderEditar);
router.put('/editar', /* checkLogin */ medico.update);
router.delete('/delete/:id', /*checkLogin, */ medico.delete);

module.exports = router;
