'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_solicitacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes', 
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      medicoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicos', 
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE, 
        allowNull: false
      }
      })
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exames');
  }
};
