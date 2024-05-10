'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atestados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diagnostico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      orientacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_emissao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      exameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exames', 
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
    await queryInterface.dropTable('atestados');
  }
};
