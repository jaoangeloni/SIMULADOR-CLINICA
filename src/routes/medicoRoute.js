const express = require('express');
const router = express.Router();

const medico = require('../controller/medicoController');
const verifyJWT = require('../middlewares/checkLogin');
// const checkLogin = require('../middlewares/checkLogin');

//router.get('/login', paciente.renderLogin);
//router.post('/login', paciente.login);

router.get('/todos', medico.getAll);
router.get('/especializacaoid/:especializacaoid', medico.findBySpecId);
router.get('/registro', medico.rederNovo);
router.post('/novo', medico.create);
//router.get('/:id', checkLogin, medico.renderEditar);
router.put('/editar', /* checkLogin */ medico.update);
router.delete('/delete/:id', /*checkLogin, */ medico.delete);


module.exports = router;
