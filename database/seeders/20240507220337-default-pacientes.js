'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const pacientes = [
      {
        nome: 'João',
        email: 'joao@example.com',
        senha: 'senha123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Eder',
        email: 'eder@example.com',
        senha: 'senha456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Mariana',
        email: 'mariana@example.com',
        senha: 'senha321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Lucas',
        email: 'lucas@example.com',
        senha: 'senha654',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    

    const pacientesCriptografados = pacientes.map(paciente => {
      const salt = bcrypt.genSaltSync();
      const senhaCriptografada = bcrypt.hashSync(paciente.senha, salt);
      return { ...paciente, senha: senhaCriptografada };
    });

    return queryInterface.bulkInsert('pacientes', pacientesCriptografados, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pacientes', null, {});
  }
};
