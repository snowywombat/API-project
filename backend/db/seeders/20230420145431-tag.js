'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Tags";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          tagName: 'baller',
        },
        {
          spotId: 2,
          userId: 2,
          tagName: 'fancy',
        },
        {
          spotId: 3,
          userId: 3,
          tagName: 'cottagecore',
        },
        {
          spotId: 4,
          userId: 4,
          tagName: 'cute',
        },
        {
          spotId: 5,
          userId: 5,
          tagName: 'quiet',
        },

      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

}
