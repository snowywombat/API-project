'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [

        {
          email: 'demo@aa.io',
          firstName: 'Demo',
          lastName: 'User',
          username: 'demo',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'tedrogers@aa.io',
          firstName: 'Ted',
          lastName: 'Rogers',
          username: 'tedrogers',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          email: 'johnsanders@aa,io',
          firstName: 'John',
          lastName: 'Sanders',
          username: 'johnsanders',
          hashedPassword: bcrypt.hashSync('password3')
        },
        {
          email: 'glennmaisel@aa.io',
          firstName: 'Glenn',
          lastName: 'Maisel',
          username: 'glennmaisel',
          hashedPassword: bcrypt.hashSync('password4')
        },
        {
          email: 'deirdremcphee@aa.io',
          firstName: 'Deirdre',
          lastName: 'McPhee',
          username: 'deirdremcphee',
          hashedPassword: bcrypt.hashSync('password5')
        },
        {
          email: 'sethbaker@aa.io',
          firstName: 'Seth',
          lastName: 'Baker',
          username: 'sethbaker',
          hashedPassword: bcrypt.hashSync('password6')
        },
        {
          email: 'shana@aa.io',
          firstName: 'Shana',
          lastName: 'Edouard',
          username: 'shanaedouard',
          hashedPassword: bcrypt.hashSync('password7')
        },
        {
          email: 'bogie@aa.io',
          firstName: 'Boglarka',
          lastName: 'Edouard',
          username: 'boglarkaedouard',
          hashedPassword: bcrypt.hashSync('password8')
        },
        {
          email: 'coreen@aa.io',
          firstName: 'Coreen',
          lastName: 'Viczian',
          username: 'coreenviczian',
          hashedPassword: bcrypt.hashSync('password9')
        },
        {
          email: 'vanessa@aa.io',
          firstName: 'Vanessa',
          lastName: 'Lopez',
          username: 'vanessalopez',
          hashedPassword: bcrypt.hashSync('password10')
        },
        {
          email: 'danny@aa.io',
          firstName: 'Daniel',
          lastName: 'Lopez',
          username: 'danielteich',
          hashedPassword: bcrypt.hashSync('password11')
        },
        {
          email: 'joe@aa.io',
          firstName: 'Joe',
          lastName: 'Weiss',
          username: 'joeweiss',
          hashedPassword: bcrypt.hashSync('password12')
        },
        {
          email: 'sandra@aa.io',
          firstName: 'Sandra',
          lastName: 'Bullock',
          username: 'sandrabullock',
          hashedPassword: bcrypt.hashSync('password13')
        },
        {
          email: 'sarah@aa.io',
          firstName: 'Sarah',
          lastName: 'Paulson',
          username: 'sandrapaulson',
          hashedPassword: bcrypt.hashSync('password14')
        },
        {
          email: 'snoop@aa.io',
          firstName: 'Snoop',
          lastName: 'Dog',
          username: 'snoopdog',
          hashedPassword: bcrypt.hashSync('password15')
        },
        {
          email: 'margot@aa.io',
          firstName: 'Margot',
          lastName: 'Robbie',
          username: 'margotrobbie',
          hashedPassword: bcrypt.hashSync('password16')
        },
        {
          email: 'reese@aa.io',
          firstName: 'Reese',
          lastName: 'Witherspoon',
          username: 'reesewitherspoon',
          hashedPassword: bcrypt.hashSync('password17')
        },
        {
          email: 'jennifer@aa.io',
          firstName: 'Jennifer',
          lastName: 'Aniston',
          username: 'jenniferaniston',
          hashedPassword: bcrypt.hashSync('password18')
        },
        {
          email: 'art@aa.io',
          firstName: 'Art',
          lastName: 'Vandelay',
          username: 'artvandelay',
          hashedPassword: bcrypt.hashSync('password19')
        },
        {
          email: 'todd@aa.io',
          firstName: 'Todd',
          lastName: 'Kraines',
          username: 'toddkraines',
          hashedPassword: bcrypt.hashSync('password20')
        },

      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

}

// options.tableName = 'Users';

// const { User } = require('../models');

// const users = [
//   {
//     email: 'tedrogers@gmail.com',
//     firstName: 'Ted',
//     lastName: 'Rogers',
//     username: 'tedrogers',
//     hashedPassword: bcrypt.hashSync('password')
//   },
//   {
//     email: 'johnsanders@gmail.com',
//     firstName: 'John',
//     lastName: 'Sanders',
//     username: 'johnsanders',
//     hashedPassword: bcrypt.hashSync('password2')
//   },
//   {
//     email: 'glennmaisel@gmail.com',
//     firstName: 'Glenn',
//     lastName: 'Maisel',
//     username: 'glennmaisel',
//     hashedPassword: bcrypt.hashSync('password3')
//   },
//   {
//     email: 'deirdremcphee@gmail.com',
//     firstName: 'Deirdre',
//     lastName: 'McPhee',
//     username: 'deirdremcphee',
//     hashedPassword: bcrypt.hashSync('password4')
//   },
//   {
//     email: 'sethbaker@gmail.com',
//     firstName: 'Seth',
//     lastName: 'Baker',
//     username: 'sethbaker',
//     hashedPassword: bcrypt.hashSync('password5')
//   },
// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await User.bulkCreate(options, { validate: true });
//     },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete(options, {}, {});
//   }
// };
