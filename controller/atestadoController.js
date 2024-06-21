const express = require('express');
const Exame = require('../models/exame');
const Paciente = require('../models/paciente');
const Medico = require('../models/medico');
const Atestado = require('../models/atestado');


exports.findByPatientId = (req, res, next) => {
    const pacienteId = req.params.id;

    Atestado.findAll({
        attributes: ['id', 'diagnostico', 'orientacao', 'data_emissao'],
        include: [
            {
                model: Exame,
                attributes: ['id'],
                include: [
                    {
                        model: Paciente,
                        attributes: ['id', 'nome'],
                        where: {
                            pacienteId: pacienteId
                        }
                    },
                    {
                        model: Medico,
                        attributes: ['id', 'nome'],
                    }
                ]
            }
        ]
    })
        .then(atestados => {
            res.status(200).json({ atestados: atestados });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
};


exports.create = (req, res, next) => {
    const diagnostico = req.body.diagnostico;
    const orientacao = req.body.orientacao;
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
        exameId: exameId
    }).then(() => {
        alterarStatus(exameId)
        res.status(201).json;
        res.redirect('/medicos/home');
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

function alterarStatus(id) {
    try {
        const exame = Exame.findOne({
            where: {
                id: id
            }
        });

        if (!exame) {
            throw new Error('Exame não encontrado');
        }

        Exame.update(
            { atendido: 1 },
            { where: { id: id } }
        );
    } catch (error) {
        console.error("Erro ao pesquisar exame");
    }
}
