const express = require('express');
const router = express.Router();

const medico = require('../controller/medicoController');
const checkLogin = require('../middlewares/checkLogin');

router.get('/login', medico.renderLogin);

router.get('/home', checkLogin, medico.renderHome);
router.post('/login', medico.login);
router.get('/todos', medico.getAll);
router.get('/especializacaoid/:especializacaoid', medico.findBySpecId);
router.post('/novo', medico.create);
//router.get('/:id', checkLogin, medico.renderEditar);
router.put('/editar', /* checkLogin */ medico.update);
router.delete('/delete/:id', /*checkLogin, */ medico.delete);

module.exports = router;
