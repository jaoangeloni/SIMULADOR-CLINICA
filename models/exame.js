const Sequelize = require('sequelize');
const database = require('../database/database');

const Paciente = require('./paciente');
const Medico = require('./medico');

const Exame = database.define('exames', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_solicitacao: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Exame.belongsTo(Paciente);
Exame.belongsTo(Medico);

module.exports = Exame;