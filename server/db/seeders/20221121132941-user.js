'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      userName: 'Админ',
      email: 'admin@mail.ru',
      password: await bcrypt.hash('123',7),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
