'use strict';

let option = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //deine your schema in options object
}

const { Booking, Spot, User } = require('../models')

const bookings = [
  {
    spot: 'River Rest 1',
    user: 'tedrogers',
    startDate: '2022-11-03',
    endDate: '2022-11-05'
  },
  {
    spot: 'Mountain Dream Escape',
    user: 'johnsanders',
    startDate: '2022-11-04',
    endDate: '2022-11-08'
  },
  {
    spot: 'The Legendary Pyramid House',
    user: 'glennmaisel',
    startDate: '2022-10-27',
    endDate: '2022-10-30'
  },
  {
    spot: 'Charming Acadian Style Cottage',
    user: 'deirdremcphee',
    startDate: '2022-12-23',
    endDate: '2022-12-26'
  },
  {
    spot: 'Oasis in the City',
    user: 'sethbaker',
    startDate: '2022-12-08',
    endDate: '2022-12-09'
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let bookingInfo of bookings) {
      const { startDate, endDate } = bookingInfo;
      const foundSpot = await Spot.findOne({
        where: { name: bookingInfo.spot }
      });
      const foundUser = await User.findOne({
        where: { username: bookingInfo.user }
      });
      await Booking.create({
        startDate,
        endDate,
        spotId: foundSpot.id,
        userId: foundUser.id,
      });
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {}, {});
  }

};
