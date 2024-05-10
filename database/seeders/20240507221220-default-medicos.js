'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const medicos = [
      {
        nome: 'Dr. Carlos',
        email: 'carlos@example.com',
        senha: 'senha123',
        especializacaoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dra. Ana',
        email: 'ana@example.com',
        senha: 'senha456',
        especializacaoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Dr. Pedro',
        email: 'pedro@example.com',
        senha: 'senha789',
        especializacaoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const medicosCriptografados = medicos.map(medico => {
      const salt = bcrypt.genSaltSync();
      const senhaCriptografada = bcrypt.hashSync(medico.senha, salt);
      return { ...medico, senha: senhaCriptografada };
    });

    await queryInterface.bulkInsert('medicos', medicosCriptografados, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('medicos', null, {});
  }
};
