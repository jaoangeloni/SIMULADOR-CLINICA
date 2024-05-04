const express = require('express');
const Especializacao = require('../models/especializacao');

exports.getAll = (req, res, next) => {
    Especializacao.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(especializacoes => {
        res.status(200).json({ especializacoes: especializacoes });

    }).catch(err => {
        console.error('Erro ao buscar especializações:', err);

        res.status(404).json({ error: 'Falha ao encontrar especializações ' });
    });
}

exports.findByName = (req, res, next) => {
    const nome = req.params.nome

    Especializacao.findOne({
        where: {
            nome: nome
        }
    }).then(especializacao => {
        res.status(200).json({ especializacao: especializacao })
    })
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Especializacao.destroy({
        where: {
            id: id
        }
    }).then(console.info("Especialização deletada com sucesso."));
}

