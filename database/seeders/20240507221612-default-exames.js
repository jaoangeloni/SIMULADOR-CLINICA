'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {

    const exames = [
      {
        data_solicitacao: new Date(),
        medicoId: 1,
        pacienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        data_solicitacao: new Date(),
        medicoId: 2,
        pacienteId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('exames', exames, {});
  },
  
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('exames', null, {});
  }
};
