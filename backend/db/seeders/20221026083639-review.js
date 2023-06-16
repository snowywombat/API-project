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
          userId: 2,
          review: 'The house was so cozy and had ever we needed. Loved the deck, fire pit and bbq!!',
          stars: 5
        },
        {
          spotId: 1,
          userId: 16,
          review: 'The spot was a hidden gem, with a welcoming host and impeccable cleanliness.',
          stars: 5
        },
        {
          spotId: 1,
          userId: 9,
          review: 'The mansion exceeded my expectations, with stunning views and thoughtful recommendations from the host.',
          stars: 5
        },
        {
          spotId: 2,
          userId: 3,
          review: 'Fair location, and the host provided standard assistance without any standout features.',
          stars: 4
        },
        {
          spotId: 2,
          userId: 6,
          review: 'The spot was exceptional, with an attentive host, stylish decor, and a perfect location.',
          stars: 5
        },
        {
          spotId: 2,
          userId: 17,
          review: 'The house had all the amenities I needed, ensuring a comfortable and enjoyable stay.',
          stars: 4
        },
        {
          spotId: 3,
          userId: 4,
          review: 'Awesome location, host was super nice and helpful.',
          stars: 5
        },
        {
          spotId: 3,
          userId: 10,
          review: 'I had a delightful time at the spot; the unique decor and personalized touches added a special charm.',
          stars: 5
        },
        {
          spotId: 3,
          userId: 15,
          review: 'The spot was a tranquil retreat, offering breathtaking views and a serene ambiance.',
          stars: 5
        },
        {
          spotId: 4,
          userId: 5,
          review: 'Very cute place, great location, we very much enjoyed our stay.',
          stars: 5
        },
        {
          spotId: 4,
          userId: 2,
          review: 'The mansion exuded elegance and luxury, creating a memorable experience for my stay.',
          stars: 5
        },
        {
          spotId: 4,
          userId: 7,
          review: "The mansion's grandeur and historic charm made me feel like royalty during my stay.",
          stars: 5
        },
        {
          spotId: 5,
          userId: 6,
          review: "The host's lack of professionalism made our stay a nightmare.",
          stars: 1
        },
        {
          spotId: 5,
          userId: 11,
          review: "Unfortunately, the spot fell short with unresponsive communication and subpar cleanliness",
          stars: 3
        },
        {
          spotId: 5,
          userId: 20,
          review: "I had a mixed experience at the house, with a friendly host but some maintenance issues.",
          stars: 4
        },
        {
          spotId: 6,
          userId: 5,
          review: 'Decent location, and the host was generally helpful, although there were some minor issues.',
          stars: 4
        },
        {
          spotId: 6,
          userId: 14,
          review: '',
          stars: 4
        },
        {
          spotId: 6,
          userId: 4,
          review: '',
          stars: 4
        },
        {
          spotId: 7,
          userId: 5,
          review: 'Superb location with an exceptionally helpful and friendly host.',
          stars: 5
        },
        {
          spotId: 7,
          userId: 13,
          review: '',
          stars: 5
        },
        {
          spotId: 7,
          userId: 18,
          review: '',
          stars: 5
        },
        {
          spotId: 8,
          userId: 2,
          review: 'Perfectly situated, and the host was incredibly helpful throughout our stay.',
          stars: 5
        },
        {
          spotId: 8,
          userId: 5,
          review: '',
          stars: 5
        },
        {
          spotId: 8,
          userId: 19,
          review: '',
          stars: 5
        },
        {
          spotId: 9,
          userId: 6,
          review: "The host's lack of respect and negligence tarnished what could have been a memorable stay in a beautiful location.",
          stars: 2
        },
        {
          spotId: 9,
          userId: 1,
          review: "",
          stars: 2
        },
        {
          spotId: 9,
          userId: 12,
          review: "",
          stars: 2
        },
        {
          spotId: 10,
          userId: 1,
          review: "Average location, and the host's assistance was satisfactory but not exceptional.",
          stars: 3
        },
        {
          spotId: 10,
          userId: 3,
          review: "",
          stars: 3
        },
        {
          spotId: 10,
          userId: 13,
          review: "",
          stars: 3
        },
        {
          spotId: 11,
          userId: 3,
          review: 'With a fantastic host and a location that offered both convenience and serenity, our stay surpassed all expectations.',
          stars: 5
        },
        {
          spotId: 11,
          userId: 16,
          review: '',
          stars: 5
        },
        {
          spotId: 11,
          userId: 18,
          review: '',
          stars: 5
        },
        {
          spotId: 12,
          userId: 4,
          review: "The host's attention to detail and personal touches perfectly matched the charm of the location, creating an exceptional stay.",
          stars: 5
        },
        {
          spotId: 12,
          userId: 5,
          review: "",
          stars: 5
        },
        {
          spotId: 12,
          userId: 11,
          review: "",
          stars: 5
        },
        {
          spotId: 13,
          userId: 5,
          review: "Considering the fair location, the host's basic support met our needs adequately without going above and beyond.",
          stars: 4
        },
        {
          spotId: 13,
          userId: 2,
          review: "",
          stars: 4
        },
        {
          spotId: 13,
          userId: 15,
          review: "",
          stars: 4
        },
        {
          spotId: 14,
          userId: 19,
          review: "Despite the great location, the host's unprofessionalism and dismissive attitude left a sour taste in our mouths.",
          stars: 2
        },
        {
          spotId: 14,
          userId: 16,
          review: "",
          stars: 2
        },
        {
          spotId: 14,
          userId: 17,
          review: "",
          stars: 2
        },
        {
          spotId: 15,
          userId: 2,
          review: 'Stay was great. Nice and quiet area. Very green and relaxing. Will stay again.',
          stars: 5
        },
        {
          spotId: 15,
          userId: 6,
          review: '',
          stars: 5
        },
        {
          spotId: 15,
          userId: 10,
          review: '',
          stars: 5
        },
        {
          spotId: 16,
          userId: 6,
          review: 'The stunning location of the accommodation added an extra layer of magic to our stay, creating an unforgettable experience.',
          stars: 5
        },
        {
          spotId: 16,
          userId: 7,
          review: '',
          stars: 5
        },
        {
          spotId: 16,
          userId: 14,
          review: '',
          stars: 5
        },
        {
          spotId: 17,
          userId: 9,
          review: 'The picturesque setting and tranquil atmosphere of the location provided the perfect backdrop for a peaceful and rejuvenating stay.',
          stars: 5
        },
        {
          spotId: 17,
          userId: 18,
          review: '',
          stars: 5
        },
        {
          spotId: 17,
          userId: 20,
          review: '',
          stars: 5
        },
        {
          spotId: 18,
          userId: 4,
          review: 'The location was decent enough for our needs, providing a reasonable balance between accessibility and affordability.',
          stars: 3
        },
        {
          spotId: 18,
          userId: 9,
          review: '',
          stars: 3
        },
        {
          spotId: 18,
          userId: 12,
          review: '',
          stars: 3
        },
        {
          spotId: 19,
          userId: 3,
          review: 'Great spot. Spacious and comfortable.',
          stars: 5
        },
        {
          spotId: 19,
          userId: 5,
          review: '',
          stars: 5
        },
        {
          spotId: 19,
          userId: 8,
          review: '',
          stars: 5
        },
        {
          spotId: 20,
          userId: 6,
          review: "We appreciated the mansion's overall comfort and its serene surroundings, although a more thorough cleaning and attention to detail would have enhanced our experience.",
          stars: 5
        },
        {
          spotId: 20,
          userId: 1,
          review: "",
          stars: 5
        },
        {
          spotId: 20,
          userId: 7,
          review: "",
          stars: 5
        },
        {
          spotId: 21,
          userId: 17,
          review: "The mansion's serene ambiance, coupled with its seamless blend of modern comforts and classic charm, made it an idyllic retreat for our vacation.",
          stars: 5
        },
        {
          spotId: 21,
          userId: 6,
          review: "",
          stars: 5
        },
        {
          spotId: 21,
          userId: 14,
          review: "",
          stars: 5
        },
        {
          spotId: 22,
          userId: 4,
          review: 'Our stay at the luxurious mansion was an absolute dream come true, with its opulent architecture, lavish interiors, and breathtaking views.',
          stars: 5
        },
        {
          spotId: 22,
          userId: 19,
          review: '',
          stars: 5
        },
        {
          spotId: 22,
          userId: 16,
          review: '',
          stars: 5
        },
        {
          spotId: 23,
          userId: 3,
          review: 'Awesome location. Host was super nice and helpful.',
          stars: 5
        },
        {
          spotId: 23,
          userId: 7,
          review: '',
          stars: 5
        },
        {
          spotId: 23,
          userId: 13,
          review: '',
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
