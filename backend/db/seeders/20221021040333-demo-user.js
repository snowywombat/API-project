'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

const users = [
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
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(users, { validate: true });
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      where: { username: users.map(user => user.username) }
    }, {});
  }
};
