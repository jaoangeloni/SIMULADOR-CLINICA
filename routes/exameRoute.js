const express = require('express');
const router = express.Router();

const exame = require('../controller/exameController');
const { route } = require('./pacienteRoute');

router.get('/:id', exame.getEverything);
router.get('/paciente/:pacienteid', exame.findByPatientId);
router.get('/medico/:medicoId', exame.findByMedicoId);
router.post('/novo', exame.create);
router.delete('/delete/:id', exame.delete);
module.exports = router;
