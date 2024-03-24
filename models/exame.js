const Sequelize = require('sequelize');
const database = require('../database/database');

const Paciente = require('./paciente');
const Medico = require('./medico');

const Exame = database.define('pacientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_solicitacao : {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Exame.belongTo(Paciente);
Exame.belongTo(Medico);

module.exports = Exame;