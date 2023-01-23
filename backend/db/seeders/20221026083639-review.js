'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review: 'The house was so cozy and had ever we needed. Loved the deck, fire pit and bbq!!',
          stars: 5
        },
        {
          spotId: 2,
          userId: 2,
          review: 'Great spot. Spacious and comfortable.',
          stars: 5
        },
        {
          spotId: 3,
          userId: 3,
          review: 'Awesome location. Host was super nice and helpful.',
          stars: 5
        },
        {
          spotId: 4,
          userId: 4,
          review: 'Very cute place, great location, we very much enjoyed our stay.',
          stars: 5
        },
        {
          spotId: 5,
          userId: 5,
          review: 'Stay was great. Nice and quiet area. Very green and relaxing. Will stay again.',
          stars: 5
        },

      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

}

// options.tableName = 'Reviews';

// const { Review, Spot, User } = require('../models')

// const reviews = [
//   {
//     spotId: 1,
//     userId: 1,
//     review: 'The house was so cozy and had ever we needed. Loved the deck, fire pit and bbq!!',
//     stars: 5
//   },
//   {
//     spotId: 2,
//     userId: 2,
//     review: 'Great spot. Spacious and comfortable.',
//     stars: 5
//   },
//   {
//     spotId: 3,
//     userId: 3,
//     review: 'Awesome location. Host was super nice and helpful.',
//     stars: 5
//   },
//   {
//     spotId: 4,
//     userId: 4,
//     review: 'Very cute place, great location, we very much enjoyed our stay.',
//     stars: 5
//   },
//   {
//     spotId: 5,
//     userId: 5,
//     review: 'Stay was great. Nice and quiet area. Very green and relaxing. Will stay again.',
//     stars: 5
//   },
// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await Review.bulkCreate(options, { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete(options, {}, {});

//   }
// };
