'use strict';

const Exame = require('../../models/exame');

module.exports = {
  async up(queryInterface, Sequelize) {

    const atestados = [
      {
        diagnostico: 'Gripe comum',
        orientacao: 'Repouso e hidratação',
        data_emissao: new Date(),
        exameId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        diagnostico: 'Dor de cabeça crônica',
        orientacao: 'Consultar um neurologista',
        data_emissao: new Date(),
        exameId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('atestados', atestados, {});
  },
  
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('atestados', null, {});
  }
};
