'use strict';

const { SpotImage, Spot } = require('../models');

const spotImages = [
  {
    spot: 'River Rest 1',
    url: 'https://a0.muscache.com/im/pictures/c258b458-1928-4115-899b-4df0a37a9009.jpg?im_w=1200',
    preview: true,
  },
  {
    spot: 'Mountain Dream Escape',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/6c44b60d-aedb-48f4-bb3e-8d78d442c660.jpeg?im_w=1200',
    preview: true,
  },
  {
    spot: 'The Legendary Pyramid House',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=1440',
    preview: true,
  },
  {
    spot: 'Charming Acadian Style Cottage',
    url: 'https://a0.muscache.com/im/pictures/f4653805-e0e2-4478-ba40-b74757767bd6.jpg?im_w=1200',
    preview: true,
  },
  {
    spot: 'Oasis in the City',
    url: 'https://a0.muscache.com/im/pictures/ed4a1c59-388b-47d1-962d-8e9594073ac7.jpg?im_w=1440',
    preview: true,
  }

];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let spotImageInfo of spotImages) {
      const { url, preview } = spotImageInfo;
      const foundSpot = await Spot.findOne({
        where: { name: spotImageInfo.spot }
      });
      await SpotImage.create({
        url,
        preview,
        spotId: foundSpot.id
      });
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {}, {});

  }
};
