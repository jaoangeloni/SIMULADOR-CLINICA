const express = require('express');
const Paciente = require('../models/paciente');
const bcrypt = require('bcryptjs');

exports.getAll = (req, res, next) => {
    Paciente.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(pacientes => {
        res.render('paciente/index', { pacientes: pacientes })
    })
}

exports.renderNovo = (req, res, next) => {
    res.render('paciente/novo', { msg: '' });
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    Paciente.findOne({
        where: {
            email: email
        }

    }).then(paciente => {
        if (paciente == undefined) {
            const salt = bcrypt.genSaltSync();
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            Paciente.create({
                nome: nome,
                email: email,
                senha: senhaCriptografada
            }).then(() => {
                res.redirect('/pacientes');
            });
        }
        else {
            res.render('paciente/novo', { msg: 'Email já cadastrado' })
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Paciente.findByPk(id).then(paciente => {
        res.render('paciente/editar', { paciente: paciente });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    Paciente.update({
        nome: nome,
        email: email
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/pacientes');
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Paciente.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/pacientes');
    })
}

exports.renderLogin = (req, res, next) => {
    res.render('paciente/login', { msg: '' });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Paciente.findOne({
        where: {
            email: email
        }
    }).then(paciente => {
        if (paciente != undefined) {
            const deuCerto = bcrypt.compareSync(senha, paciente.senha);
            if (deuCerto) {
                req.session.login = {
                    nome: paciente.nome
                }

                res.redirect('/pacientes');
            }
            else {
                res.render('paciente/login', { msg: 'Usuário ou senha inválidos' });
            }
        }
        else {
            res.render('paciente/login', { msg: 'Usuário ou senha inválidos' });
        }
    })
}