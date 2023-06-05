'use strict';
const bcrypt = require("bcryptjs");

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
          userId: 2,
          startDate: '2023-07-03',
          endDate: '2023-07-05'
        },
        {
          spotId: 2,
          userId: 3,
          startDate: '2023-08-04',
          endDate: '2023-08-08'
        },
        {
          spotId: 3,
          userId: 4,
          startDate: '2023-09-27',
          endDate: '2023-09-30'
        },
        {
          spotId: 4,
          userId: 5,
          startDate: '2023-07-23',
          endDate: '2023-07-26'
        },
        {
          spotId: 5,
          userId: 6,
          startDate: '2023-08-04',
          endDate: '2023-08-08'
        },
        {
          spotId: 6,
          userId: 7,
          startDate: '2023-09-08',
          endDate: '2023-09-12'
        },
        {
          spotId: 7,
          userId: 8,
          startDate: '2023-07-23',
          endDate: '2023-07-25'
        },
        {
          spotId: 8,
          userId: 9,
          startDate: '2023-08-03',
          endDate: '2023-08-08'
        },
        {
          spotId: 9,
          userId: 10,
          startDate: '2023-09-13',
          endDate: '2023-09-27'
        },
        {
          spotId: 10,
          userId: 11,
          startDate: '2023-07-02',
          endDate: '2023-07-05'
        },
        {
          spotId: 11,
          userId: 12,
          startDate: '2023-08-19',
          endDate: '2023-08-22'
        },
        {
          spotId: 12,
          userId: 13,
          startDate: '2023-09-15',
          endDate: '2023-09-18'
        },
        {
          spotId: 13,
          userId: 14,
          startDate: '2023-07-21',
          endDate: '2023-07-25'
        },
        {
          spotId: 14,
          userId: 15,
          startDate: '2023-08-23',
          endDate: '2023-08-27'
        },
        {
          spotId: 15,
          userId: 16,
          startDate: '2023-09-01',
          endDate: '2023-09-10'
        },
        {
          spotId: 16,
          userId: 17,
          startDate: '2023-07-03',
          endDate: '2023-07-08'
        },
        {
          spotId: 17,
          userId: 18,
          startDate: '2023-08-14',
          endDate: '2023-08-17'
        },
        {
          spotId: 18,
          userId: 19,
          startDate: '2023-09-07',
          endDate: '2023-09-12'
        },
        {
          spotId: 19,
          userId: 20,
          startDate: '2023-07-05',
          endDate: '2023-07-07'
        },
        {
          spotId: 20,
          userId: 19,
          startDate: '2023-08-12',
          endDate: '2023-08-20'
        },
        {
          spotId: 21,
          userId: 18,
          startDate: '2023-09-03',
          endDate: '2023-09-04'
        },
        {
          spotId: 22,
          userId: 17,
          startDate: '2023-07-08',
          endDate: '2023-07-09'
        },
        {
          spotId: 23,
          userId: 16,
          startDate: '2023-08-22',
          endDate: '2023-08-24'
        },
        {
          spotId: 22,
          userId: 17,
          startDate: '2023-10-26',
          endDate: '2023-10-29'
        },
        {
          spotId: 21,
          userId: 16,
          startDate: '2023-11-06',
          endDate: '2023-11-07'
        },
        {
          spotId: 20,
          userId: 15,
          startDate: '2023-12-23',
          endDate: '2023-12-29'
        },
        {
          spotId: 19,
          userId: 16,
          startDate: '2023-10-29',
          endDate: '2023-10-31'
        },
        {
          spotId: 18,
          userId: 15,
          startDate: '2023-11-11',
          endDate: '2023-11-14'
        },
        {
          spotId: 17,
          userId: 17,
          startDate: '2023-12-02',
          endDate: '2023-12-07'
        },
        {
          spotId: 16,
          userId: 16,
          startDate: '2023-10-03',
          endDate: '2023-10-05'
        },
        {
          spotId: 15,
          userId: 15,
          startDate: '2023-11-16',
          endDate: '2023-11-17'
        },
        {
          spotId: 14,
          userId: 13,
          startDate: '2023-12-07',
          endDate: '2023-12-13'
        },
        {
          spotId: 13,
          userId: 12,
          startDate: '2023-10-14',
          endDate: '2023-10-17'
        },
        {
          spotId: 12,
          userId: 11,
          startDate: '2023-11-05',
          endDate: '2023-11-10'
        },
        {
          spotId: 11,
          userId: 10,
          startDate: '2023-12-01',
          endDate: '2023-12-06'
        },
        {
          spotId: 10,
          userId: 9,
          startDate: '2023-10-09',
          endDate: '2023-10-12'
        },
        {
          spotId: 9,
          userId: 8,
          startDate: '2023-11-04',
          endDate: '2023-11-11'
        },
        {
          spotId: 8,
          userId: 7,
          startDate: '2023-12-19',
          endDate: '2023-12-22'
        },
        {
          spotId: 7,
          userId: 6,
          startDate: '2023-10-11',
          endDate: '2023-10-12'
        },
        {
          spotId: 6,
          userId: 5,
          startDate: '2023-11-06',
          endDate: '2023-11-17'
        },
        {
          spotId: 5,
          userId: 4,
          startDate: '2023-12-22',
          endDate: '2023-12-26'
        },
        {
          spotId: 4,
          userId: 3,
          startDate: '2023-10-28',
          endDate: '2023-10-30'
        },
        {
          spotId: 3,
          userId: 2,
          startDate: '2023-11-01',
          endDate: '2023-11-04'
        },
        {
          spotId: 2,
          userId: 1,
          startDate: '2023-12-05',
          endDate: '2023-12-14'
        },
        {
          spotId: 1,
          userId: 6,
          startDate: '2023-12-05',
          endDate: '2023-12-14'
        },
      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

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
