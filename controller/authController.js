const Paciente = require('../models/paciente');
const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.SECRET;

const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!",
        });
    }

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            statusCode: 401,
            message: "Token não valido."
        });
    }
};

const login = async (req, res) => {
    try {
        let usuario = await Paciente.findOne({ where: { email: req.body.email } });

        if (!usuario) {
            usuario = await Medico.findOne({ where: { email: req.body.email } });

        }

        if (!usuario) {
            res.render('paciente/login', { msg: 'Usuário ou senha inválidos' });
        }

        const validacaoPassword = bcrypt.compareSync(req.body.senha, usuario.senha);

        if (!validacaoPassword) {
            res.render('paciente/login', { msg: 'Usuário ou senha inválidos' });
        }

        const token = jwt.sign({ name: usuario.nome }, SECRET);

        req.session.login = {
            id: usuario.id,
            nome: usuario.nome,
            tipo: usuario.especializacaoId ? 'medico' : 'paciente'
        }

        if (usuario.especializacaoId) {
            res.redirect('/medicos/home');
        } else {
            res.redirect('/pacientes/home');
        }

    } catch (error) {
        res.render('paciente/login', { msg: 'Usuário ou senha inválidos' });
    }
};

const logout = (req, res) => {
    const isMedico = req.session.login && req.session.login.tipo === 'medico';

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao fazer logout",
            });
        }
        if (isMedico) {
            res.redirect('/medicos/login');
        } else {
            res.redirect('/pacientes/login');
        }
    });
};




module.exports = {
    login,
    verificarToken,
    logout
};
