'use strict';
// const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: '2022-11-03',
          endDate: '2022-11-05'
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '2022-11-04',
          endDate: '2022-11-08'
        },
        {
          spotId: 3,
          userId: 3,
          startDate: '2022-10-27',
          endDate: '2022-10-30'
        },
        {
          spotId: 4,
          userId: 4,
          startDate: '2022-12-23',
          endDate: '2022-12-26'
        },
        {
          spotId: 5,
          userId: 5,
          startDate: '2022-12-08',
          endDate: '2022-12-09'
        },
      ],

      {}

    );
  },

}



// options.tableName = 'Bookings';

// const { Booking, Spot, User } = require('../models')

// const bookings = [
//   {
//     spotId: 1,
//     userId: 1,
//     startDate: '2022-11-03',
//     endDate: '2022-11-05'
//   },
//   {
//     spotId: 2,
//     userId: 2,
//     startDate: '2022-11-04',
//     endDate: '2022-11-08'
//   },
//   {
//     spotId: 3,
//     userId: 3,
//     startDate: '2022-10-27',
//     endDate: '2022-10-30'
//   },
//   {
//     spotId: 4,
//     userId: 4,
//     startDate: '2022-12-23',
//     endDate: '2022-12-26'
//   },
//   {
//     spotId: 5,
//     userId: 5,
//     startDate: '2022-12-08',
//     endDate: '2022-12-09'
//   },
// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await Booking.bulkCreate(options, { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete(options, {}, {});
//   }

// };
