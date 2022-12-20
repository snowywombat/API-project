'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

const { Review, Spot, User } = require('../models')

const reviews = [
  {
    spot: 'River Rest 1',
    user: 'tedrogers',
    review: 'The house was so cozy and had ever we needed. Loved the deck, fire pit and bbq!!',
    stars: 5
  },
  {
    spot: 'Mountain Dream Escape',
    user: 'johnsanders',
    review: 'Great spot. Spacious and comfortable.',
    stars: 5
  },
  {
    spot: 'The Legendary Pyramid House',
    user: 'glennmaisel',
    review: 'Awesome location. Host was super nice and helpful.',
    stars: 5
  },
  {
    spot: 'Charming Acadian Style Cottage',
    user: 'deirdremcphee',
    review: 'Very cute place, great location, we very much enjoyed our stay.',
    stars: 5
  },
  {
    spot: 'Oasis in the City',
    user: 'sethbaker',
    review: 'Stay was great. Nice and quiet area. Very green and relaxing. Will stay again.',
    stars: 5
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let reviewInfo of reviews) {
      const { review, stars } = reviewInfo;
      const foundSpot = await Spot.findOne({
        where: { name: reviewInfo.spot}
      });
      const foundUser = await User.findOne({
        where: { username: reviewInfo.user}
      });
      await Review.create({
        review,
        stars,
        spotId: foundSpot.id,
        userId: foundUser.id
      });
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {}, {});

  }
};
