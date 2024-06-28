const express = require('express');
const Exame = require('../models/exame');
const Medico = require('../models/medico');
const Paciente = require('../models/paciente');
const Especializacao = require('../models/especializacao');

exports.findByPatientId = (req, res, next) => {
    const pacienteid = req.params.pacienteid;

    Exame.findAll({
        attributes: ['id', 'data_solicitacao', 'atendido'],
        include: [
            {
                model: Paciente,
                as: 'paciente',
                attributes: ['id', 'nome']
            },
            {
                model: Medico,
                as: 'medico',
                attributes: ['id', 'nome'],
                include: [
                    {
                        model: Especializacao,
                        attributes: ['nome']
                    }
                ]
            }

        ],
        where: {
            pacienteId: pacienteid
        }
    }).then(exames => {
        res.status(200).json({ exames: exames });
    }).catch(err => {
        res.status(404).json({ error: "Nada encontrado!" });
    })
}

exports.findByMedicoId = (req, res, next) => {
    const medicoId = req.params.medicoId;
    Exame.findAll({
        attributes: ['id', 'data_solicitacao', 'atendido'],
        include: [
            {
                model: Paciente,
                as: 'paciente',
                attributes: ['id', 'nome']
            },
            {
                model: Medico,
                as: 'medico',
                attributes: ['id', 'nome'],
            }

        ],
        where: {
            medicoId: medicoId
        }
    }).then(exames => {
        res.status(200).json({ exames: exames });
    })
}

exports.getEverything = (req, res, next) => {
    const id = req.params.id

    Exame.findAll({
        attributes: ['id', 'data_solicitacao'],
        include: [
            {
                model: Paciente,
                as: 'paciente',
                attributes: ['id', 'nome']
            },
            {
                model: Medico,
                as: 'medico',
                attributes: ['id', 'nome'],
                include: {
                    model: Especializacao,
                    attributes: ['id', 'nome']
                }
            }
        ],
        where: {
            pacienteId: id
        }
    }).then(exames => {
        res.status(200).json({ exames: exames });
    })
}


exports.create = (req, res, next) => {
    const data_solicitacao = req.body.data;
    const pacienteId = req.body.paciente;
    const medicoId = req.body.medicos;

    if (data_solicitacao == '' || data_solicitacao == undefined || data_solicitacao == null) {
        return res.redirect('/pacientes/home'), { msg: 'Data inválida' };
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
    }).then(() => {
        res.redirect('/pacientes/home');
    }).catch(err => {
        res.status(400).json({ error: err });
    })
}

