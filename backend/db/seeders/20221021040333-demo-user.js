'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

options.tableName = 'Users';

const { User } = require('../models');

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
    await User.bulkCreate(options, { validate: true });
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
