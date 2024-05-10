const express = require('express');
const Medico = require('../models/medico');
const Especializacao = require('../models/especializacao');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');

exports.getAll = (req, res, next) => {
    Medico.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(medicos => {
        res.status(200).json({ medicos: medicos });
    }).catch(err => {
        res.status(404).json({ error: err });
    });
}

exports.findBySpecId = (req, res, next) => {
    const especializacaoid = req.params.especializacaoid;

    Medico.findAll({
        where: {
            especializacaoId: especializacaoid
        }

    }).then(medicos => {
        res.status(200).json({ medicos: medicos })
    }).catch(err => {
        res.status(404).json({ error: err });
    })
}

exports.rederNovo = (req, res, next) => {
    res.render('medico/novo');
}
exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const especializacaoId = req.body.especializacaoId;
    Especializacao.findOne({
        where: {
            id: especializacaoId
        }
    })
        .then(especializacao => {
            if (!especializacao) {
                return res.status(404).json({ error: 'Especialização não encontrada' });
            }

            Medico.create({
                nome: nome,
                email: email,
                senha: senha,
                especializacaoId: especializacaoId // Corrigido para usar especializacaoId
            })
                .then(() => {
                    res.status(201).json({ message: 'Médico criado com sucesso' });
                })
                .catch(err => {
                    console.error('Erro ao criar médico:', err);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                });
        })
        .catch(err => {
            console.error('Erro ao encontrar especialização:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Medico.findByPk(id).then(medico => {
        res.render('medico/editar', { medico: medico });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    Medico.update({
        nome: nome,
        email: email,
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/medicos/todos');
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Medico.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/medicos/todos');
    })
}

exports.renderLogin = (req, res, next) => {
    res.render('login', { msg: '' });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Medico.findOne({
        where: {
            email: email
        }
    }).then(medico => {
        if (medico != undefined) {
            const deuCerto = bcrypt.compareSync(senha, medico.senha);
            if (deuCerto) {
                req.session.login = {
                    nome: medico.nome
                }

                res.redirect('/');
            }
            else {
                res.render('login', { msg: 'Usuário ou senha inválidos' });
            }
        }
        else {
            res.render('login', { msg: 'Usuário ou senha inválidos' });
        }
    })
}
