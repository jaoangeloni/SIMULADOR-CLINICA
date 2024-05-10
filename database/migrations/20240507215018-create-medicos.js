'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      especializacaoId: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        references: {
          model: 'Especializacoes', 
          key: 'id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medicos');
  }
};
