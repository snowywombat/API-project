'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

options.tableName = 'SpotImages';

const { SpotImage, Spot } = require('../models');

const spotImages = [
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/c258b458-1928-4115-899b-4df0a37a9009.jpg?im_w=1200',
    preview: true,
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/6c44b60d-aedb-48f4-bb3e-8d78d442c660.jpeg?im_w=1200',
    preview: true,
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=1440',
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/f4653805-e0e2-4478-ba40-b74757767bd6.jpg?im_w=1200',
    preview: true,
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/ed4a1c59-388b-47d1-962d-8e9594073ac7.jpg?im_w=1440',
    preview: true,
  }

];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});

  }
};
