const Sequelize = require('sequelize');
const database = require('../database/database');

const Especializacao = require('./especializacao');

const Medico = database.define('pacientes', {
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

Medico.belongTo(Especializacao);

Medico.sync({force: true});

module.exports = Medico;