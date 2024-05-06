const express = require('express');
const Exame = require('../models/exame');
const Medico = require('../models/medico');
const Paciente = require('../models/paciente');

exports.findByPatientId = (req, res, next) => {
    const pacienteid = req.params.pacienteid;

    Exame.findAll({
        where: {
            pacienteId: pacienteid
        }
    }).then(exames => {
        res.status(200).json({ exames: exames });
    }).catch(err => {
        res.status(404).json({ error: "Nada encontrado!" });
    })
}

exports.create = (req, res, next) => {
    const data_solicitacao = req.body.data;
    const pacienteId = req.body.paciente;
    const medicoId = req.body.medicos;

    if (data_solicitacao == '' || data_solicitacao == undefined || data_solicitacao == null) {
        return res.status(400).json({ error: 'Data inválida!' })
    }

    Medico.findOne({
        where: {
            id: medicoId
        }
    }).then(medicos => {
        if (!medicos) {
            return res.status(404).json({
                error: 'Medico nao encontrado!'
            })
        }
    })

    Paciente.findOne({
        where: {
            id: pacienteId
        }
    }).then(pacientes => {
        if (!pacientes) {
            return res.status(404).json({
                error: 'Paciente nao encontrado!'
            })
        }
    })

    Exame.create({
        data_solicitacao: data_solicitacao,
        pacienteId: pacienteId,
        medicoId: medicoId
    }).then(() => {
        res.redirect('/pacientes/home');
    }).catch(err => {
        res.status(400).json({ error: err });
    })
}


exports.delete = (req, res, next) => {
    const id = req.params.id;

    Exame.destroy({
        where: {
            id: id
        }
    }).then(console.info("Destruido com sucesso!"));
}

