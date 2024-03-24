const Sequelize = require('sequelize');
const database = require('../database/database');

const Especializacao = database.define('pacientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Especializacao.sync({force: true});

module.exports = Especializacao;