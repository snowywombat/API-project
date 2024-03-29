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
          tagName: 'spacious',
        },
        {
          spotId: 1,
          userId: 1,
          tagName: 'quiet',
        },
        {
          spotId: 1,
          userId: 1,
          tagName: 'nature',
        },
        {
          spotId: 2,
          userId: 2,
          tagName: 'suburban',
        },
        {
          spotId: 2,
          userId: 2,
          tagName: 'homey',
        },
        {
          spotId: 2,
          userId: 2,
          tagName: 'family-friendly',
        },
        {
          spotId: 3,
          userId: 3,
          tagName: 'sleek',
        },
        {
          spotId: 3,
          userId: 3,
          tagName: 'modern',
        },
        {
          spotId: 3,
          userId: 3,
          tagName: 'relaxing',
        },
        {
          spotId: 4,
          userId: 4,
          tagName: 'charming',
        },
        {
          spotId: 4,
          userId: 4,
          tagName: 'elegant',
        },
        {
          spotId: 4,
          userId: 4,
          tagName: 'mansion',
        },
        {
          spotId: 5,
          userId: 5,
          tagName: 'modern',
        },
        {
          spotId: 5,
          userId: 5,
          tagName: 'cubical',
        },
        {
          spotId: 5,
          userId: 5,
          tagName: 'cool',
        },
        {
          spotId: 6,
          userId: 6,
          tagName: 'beach',
        },
        {
          spotId: 6,
          userId: 6,
          tagName: 'poolside',
        },
        {
          spotId: 6,
          userId: 6,
          tagName: 'california',
        },
        {
          spotId: 7,
          userId: 7,
          tagName: 'beach',
        },
        {
          spotId: 7,
          userId: 7,
          tagName: 'spacious',
        },
        {
          spotId: 7,
          userId: 7,
          tagName: 'nautical',
        },
        {
          spotId: 8,
          userId: 8,
          tagName: 'mansion',
        },
        {
          spotId: 8,
          userId: 8,
          tagName: 'modern',
        },
        {
          spotId: 8,
          userId: 8,
          tagName: 'residential',
        },
        {
          spotId: 9,
          userId: 9,
          tagName: 'aged',
        },
        {
          spotId: 9,
          userId: 9,
          tagName: 'mature',
        },
        {
          spotId: 9,
          userId: 9,
          tagName: 'manicured',
        },
        {
          spotId: 10,
          userId: 10,
          tagName: 'cute',
        },
        {
          spotId: 10,
          userId: 10,
          tagName: 'italian',
        },
        {
          spotId: 10,
          userId: 10,
          tagName: 'picturesque',
        },
        {
          spotId: 11,
          userId: 11,
          tagName: 'grand',
        },
        {
          spotId: 11,
          userId: 11,
          tagName: 'lofty',
        },
        {
          spotId: 11,
          userId: 11,
          tagName: 'garden',
        },
        {
          spotId: 12,
          userId: 12,
          tagName: 'picturesque',
        },
        {
          spotId: 12,
          userId: 12,
          tagName: 'matured',
        },
        {
          spotId: 12,
          userId: 12,
          tagName: 'homey',
        },
        {
          spotId: 13,
          userId: 13,
          tagName: 'resort',
        },
        {
          spotId: 13,
          userId: 13,
          tagName: 'lively',
        },
        {
          spotId: 13,
          userId: 13,
          tagName: 'beach',
        },
        {
          spotId: 14,
          userId: 14,
          tagName: 'sleek',
        },
        {
          spotId: 14,
          userId: 14,
          tagName: 'minimalistic',
        },
        {
          spotId: 14,
          userId: 14,
          tagName: 'modern',
        },
        {
          spotId: 15,
          userId: 8,
          tagName: 'mansion',
        },
        {
          spotId: 15,
          userId: 8,
          tagName: 'eco-friendly',
        },
        {
          spotId: 15,
          userId: 8,
          tagName: 'grand',
        },
        {
          spotId: 16,
          userId: 9,
          tagName: 'brick',
        },
        {
          spotId: 16,
          userId: 9,
          tagName: 'mansion',
        },
        {
          spotId: 16,
          userId: 9,
          tagName: 'antique',
        },
        {
          spotId: 17,
          userId: 15,
          tagName: 'grandiose',
        },
        {
          spotId: 17,
          userId: 15,
          tagName: 'marble',
        },
        {
          spotId: 17,
          userId: 15,
          tagName: 'family-friendly',
        },
        {
          spotId: 18,
          userId: 16,
          tagName: 'villa',
        },
        {
          spotId: 18,
          userId: 16,
          tagName: 'relaxing',
        },
        {
          spotId: 18,
          userId: 16,
          tagName: 'tropical',
        },
        {
          spotId: 19,
          userId: 17,
          tagName: 'french-style',
        },
        {
          spotId: 19,
          userId: 17,
          tagName: 'pet-friendly',
        },
        {
          spotId: 19,
          userId: 17,
          tagName: 'big yard',
        },
        {
          spotId: 20,
          userId: 18,
          tagName: 'mansion',
        },
        {
          spotId: 20,
          userId: 18,
          tagName: 'charm',
        },
        {
          spotId: 20,
          userId: 18,
          tagName: 'garden',
        },
        {
          spotId: 21,
          userId: 19,
          tagName: 'grandoise',
        },
        {
          spotId: 21,
          userId: 19,
          tagName: 'stunning',
        },
        {
          spotId: 21,
          userId: 19,
          tagName: 'family-friendly',
        },
        {
          spotId: 22,
          userId: 20,
          tagName: 'flora',
        },
        {
          spotId: 22,
          userId: 20,
          tagName: 'pool',
        },
        {
          spotId: 22,
          userId: 20,
          tagName: 'quiet',
        },
        {
          spotId: 23,
          userId: 2,
          tagName: 'artsy',
        },
        {
          spotId: 23,
          userId: 2,
          tagName: 'modern',
        },
        {
          spotId: 23,
          userId: 2,
          tagName: 'whimsical',
        },
      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

}
