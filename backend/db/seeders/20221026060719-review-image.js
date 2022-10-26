'use strict';

const { ReviewImage, Review } = require('../models');

const reviewImages = [
  {
    review: 'The house was so cozy and had ever we needed. Loved the deck, fire pit and bbq!!',
    url: 'https://a0.muscache.com/im/pictures/f4e48fa4-df3c-4827-8ff6-6b343c3aa671.jpg?im_w=1200'
  },
  {
    review: 'Great spot. Spacious and comfortable.',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/995ec67f-a4dd-4010-ac40-926441bca80e.jpeg?im_w=1200'
  },
  {
    review: 'Awesome location. Host was super nice and helpful.',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/843cfa7a-d939-4c4c-9c85-bcff58908ae4.jpeg?im_w=1200'
  },
  {
    review: 'Very cute place, great location, we very much enjoyed our stay.',
    url: 'https://a0.muscache.com/im/pictures/2970df4a-83c5-4a45-8b74-f7f828a35141.jpg?im_w=1200'
  },
  {
    review: 'Stay was great. Nice and quiet area. Very green and relaxing. Will stay again.',
    url: 'https://a0.muscache.com/im/pictures/e95f1929-46fe-43f5-b20e-590ec2be9db4.jpg?im_w=1200'
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let reviewImageInfo of reviewImages) {
      const { url } = reviewImageInfo;
      const foundReview = await Review.findOne({
        where: { review: reviewImageInfo.review }
      });
      await ReviewImage.create({
        url,
        reviewId: foundReview.id
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
      where: { review: reviewImages.map(reviewImage => reviewImage.review) }
    }, {});
  }
};
