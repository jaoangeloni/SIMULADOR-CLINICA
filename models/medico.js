const Sequelize = require('sequelize');
const database = require('../database/database');

const Especializacao = require('./especializacao');

const Medico = database.define('medicos', {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Medico.belongsTo(Especializacao);

module.exports = Medico;