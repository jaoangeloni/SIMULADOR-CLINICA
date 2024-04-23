const express = require('express');
const Paciente = require('../models/paciente');
const bcrypt = require('bcryptjs');

exports.getAll = (req, res, next) => {
    Paciente.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(pacientes => {
        res.render('paciente/index', {pacientes: pacientes})
    })
}

exports.rederNovo = (req, res, next) => {
    res.render('paciente/novo');
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
        if(paciente == undefined)
        {
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
        else
        {
            res.redirect('/pacientes');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Paciente.findByPk(id).then(paciente => {
        res.render('paciente/editar', {paciente: paciente});
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
    res.render('login', {msg: ''});
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Paciente.findOne({
        where: {
            email: email
        }
    }).then(paciente => {
        if(paciente != undefined)
        {
            const deuCerto = bcrypt.compareSync(senha, paciente.senha);
            if(deuCerto)
            {
                req.session.login = {
                    nome: paciente.nome
                }

                res.redirect('/');
            }
            else
            {
                res.render('login', { msg: 'Usuário ou senha inválidos'});
            }
        }
        else
        {
            res.render('login', { msg: 'Usuário ou senha inválidos'});
        }
    })
}