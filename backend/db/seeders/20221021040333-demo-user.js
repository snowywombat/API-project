'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Users', [
      {
        email: 'tedrogers@gmail.com',
        firstName: 'Ted',
        lastName: 'Rogers',
        username: 'tedrogers',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'johnsanders@gmail.com',
        firstName: 'John',
        lastName: 'Sanders',
        username: 'johnsanders',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'glennmaisel@gmail.com',
        firstName: 'Glenn',
        lastName: 'Maisel',
        username: 'glennmaisel',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'deirdremcphee@gmail.com',
        firstName: 'Deirdre',
        lastName: 'McPhee',
        username: 'deirdremcphee',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'sethbaker@gmail.com',
        firstName: 'Seth',
        lastName: 'Baker',
        username: 'sethbaker',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
     }, {});
  }
};
