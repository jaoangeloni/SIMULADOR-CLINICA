const express = require('express');
const Exame = require('../models/exame');
const Atestado = require('../models/atestado');

exports.create = (req, res, next) => {
    const diagnostico = req.body.diagnostico;
    const orientacao = req.body.orientacao;
    const data_emissao = req.body.data_emissao;
    const exameId = req.body.exameId;

    Exame.findOne({
        where: {
            id: exameId
        }
    }).then(exame => {
        if (!exame) {
            return res.status(404).json({
                error: 'Exame nao encontrado!'
            })
        }
    })


    Atestado.create({
        diagnostico: diagnostico,
        orientacao: orientacao,
        data_emissao: data_emissao,
        exameId: exameId
    }).then(() => {
        res.status(201).json({
            message: 'Atestado emitido com sucesso!'
        })
    }).catch(err => {
        console.error('Error ao emitir atestado... - ', err);
        res.status(500).json({
            error: 'Erro!'
        })
    })
}


exports.delete = (req, res, next) => {
    const id = req.params.id;

    Atestado.destroy({
        where: {
            id: id
        }
    }).then(console.info("Atestado deletado com sucesso!"));
}

