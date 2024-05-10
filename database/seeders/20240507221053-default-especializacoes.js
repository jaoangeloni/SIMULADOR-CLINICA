'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('especializacoes', [
      {
        nome: 'Clínico Geral',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pediatra',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Cardiologista',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dermatologista',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ortopedista',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ])
},


  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('especializacoes', null, {});
  }
};