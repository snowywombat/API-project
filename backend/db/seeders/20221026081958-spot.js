'use strict';

let option = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //deine your schema in options object
}

const { Spot, User } = require('../models');

const spots = [
  {
    address:'123 A. Street Fairbanks, Alaska 99703',
    city: 'Fairbanks',
    state: 'Alaska',
    country: 'United States',
    lat: 64.8401,
    lng: -147.7200,
    name: 'River Rest 1',
    description:'Modern tiny home on the banks of the Chena River.',
    price: 119.00,
    owner: 'tedrogers',
  },
  {
    address:'234 B. Street Leavenworth, Washington 98826',
    city: 'Leavenworth',
    state: 'Washington',
    country: 'United States',
    lat: 47.5962,
    lng: -120.6615,
    name: 'Mountain Dream Escape',
    description:'Na-Mu Lodge offers 4 luxurious suites each w/private baths, plus our bunk room w/plenty of space for everyone.',
    price: 1303.00,
    owner: 'johnsanders',
  },
  {
    address:'345 C. Street Fire Island Pines, New York 11782',
    city: 'Fire Island Pines',
    state: 'New York',
    country: 'United States',
    lat: 40.6653,
    lng: -73.0693,
    name: 'The Legendary Pyramid House',
    description:'Iconic architectural masterpiece (b. 1961) with spectacular views offers unparalleled peace and privacy.',
    price: 1460.00,
    owner: 'glennmaisel',
  },
  {
    address:'456 D. Street Baton Rouge, Louisiana 70801',
    city: 'Baton Rouge',
    state: 'Louisiana',
    country: 'United States',
    lat: 30.4515,
    lng: -91.1871,
    name: 'Charming Acadian Style Cottage',
    description:'This beautifully appointed 1 bedroom/1 bath Acadian Style Cottage is located on a private street',
    price: 43.00,
    owner: 'deirdremcphee',
  },
  {
    address:'567 E. Street Albuquerque, New Mexico 87105',
    city: 'Albuquerque',
    state: 'New Mexico',
    country: 'United States',
    lat: 35.0844,
    lng: -106.6504,
    name: 'Oasis in the City',
    description:'Lovely 1 bd / 1 ba (1,100 sq ft) "casita" (guesthouse) nestled on an acre in the beautiful North Valley.',
    price: 110.00,
    owner: 'sethbaker',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let spotInfo of spots) {
      const { address, city, state, country, lat, lng, name, description, price } = spotInfo;
      const foundUser = await User.findOne({
        where: { username: spotInfo.owner }
      });
      await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: foundUser.id
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {}, {});

  }
};
