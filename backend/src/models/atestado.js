const Sequelize = require('sequelize');
const database = require('../../database/database');

const Exame = require('./exame');

const Atestado = database.define('atestados', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    diagnostico: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    orientacao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_emissao : {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Atestado.belongsTo(Exame);

module.exports = Atestado;