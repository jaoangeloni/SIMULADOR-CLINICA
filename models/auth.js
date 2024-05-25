const Sequelize = require('sequelize');
const database = require('../database/database');
const Paciente = require('./paciente');
const Medico = require('./medico');

const Auth = database.define('auth', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ativo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    medicoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Medico,
            key: 'id'
        }
    }
});

Auth.belongsTo(Medico);
Auth.belongsTo(Paciente);

module.exports = Auth;
