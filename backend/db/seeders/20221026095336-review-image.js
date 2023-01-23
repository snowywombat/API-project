'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [

        {
          reviewId: 1,
          url: 'https://a0.muscache.com/im/pictures/f4e48fa4-df3c-4827-8ff6-6b343c3aa671.jpg?im_w=1200'
        },
        {
          reviewId: 2,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/995ec67f-a4dd-4010-ac40-926441bca80e.jpeg?im_w=1200'
        },
        {
          reviewId: 3,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/843cfa7a-d939-4c4c-9c85-bcff58908ae4.jpeg?im_w=1200'
        },
        {
          reviewId: 4,
          url: 'https://a0.muscache.com/im/pictures/2970df4a-83c5-4a45-8b74-f7f828a35141.jpg?im_w=1200'
        },
        {
          reviewId: 5,
          url: 'https://a0.muscache.com/im/pictures/e95f1929-46fe-43f5-b20e-590ec2be9db4.jpg?im_w=1200'
        }

      ],

      {}

    );
  },

}

// options.tableName = 'ReviewImages';

// const { ReviewImage, Review } = require('../models');

// const reviewImages = [
//   {
//     reviewId: 1,
//     url: 'https://a0.muscache.com/im/pictures/f4e48fa4-df3c-4827-8ff6-6b343c3aa671.jpg?im_w=1200'
//   },
//   {
//     reviewId: 2,
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/995ec67f-a4dd-4010-ac40-926441bca80e.jpeg?im_w=1200'
//   },
//   {
//     reviewId: 3,
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/843cfa7a-d939-4c4c-9c85-bcff58908ae4.jpeg?im_w=1200'
//   },
//   {
//     reviewId: 4,
//     url: 'https://a0.muscache.com/im/pictures/2970df4a-83c5-4a45-8b74-f7f828a35141.jpg?im_w=1200'
//   },
//   {
//     reviewId: 5,
//     url: 'https://a0.muscache.com/im/pictures/e95f1929-46fe-43f5-b20e-590ec2be9db4.jpg?im_w=1200'
//   }

// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await ReviewImage.bulkCreate(options, { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete(options, {}, {});

//   }
// };
