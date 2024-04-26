const express = require('express');
const Exame = require('../models/exame');
const Medico = require('../models/medico');
const Paciente = require('../models/paciente');
const bcrypt = require('bcryptjs');

exports.create = (req, res, next) => {
    const data_solicitacao = req.body.data_solicitacao; 
    const pacienteId = req.body.pacienteId; 
    const medicoId = req.body.medicoId; 

    Medico.findOne({
        where: {
            id: medicoId
        }
    }).then(medicos => {
        if(!medicos){
            return res.status(404).json({
                error: 'Medico nao encontrado!'
            })
        }
    })

    Paciente.findOne({
        where: {
            id: pacienteId
        }
    }) .then(pacientes => {
        if(!pacientes){
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
        res.status(201).json({
            message: 'Exame emitido com sucesso!'
        })
    }).catch(err => {
        console.error('Error ao emitir o pedido de exame: ', err);
        res.status(500).json({
            error: 'Erro!'
        })
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

