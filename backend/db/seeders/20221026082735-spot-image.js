'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [

        {
          spotId: 1,
          url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Burkhart_dibrell_house.jpg',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://images.pexels.com/photos/5997994/pexels-photo-5997994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://images.pexels.com/photos/7031595/pexels-photo-7031595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://www.onlyinyourstate.com/wp-content/uploads/2016/03/24431871261_9fe6150deb_k.jpg',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 6,
          url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 7,
          url: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 8,
          url: 'https://static.mansionglobal.com/production/media/article-images/433cb07ee9f3acaf5fe99e663947d77c/large_Seattle_14.jpg',
          preview: true,
        },
        {
          spotId: 9,
          url: 'https://images.pexels.com/photos/210474/pexels-photo-210474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          preview: true,
        },
        {
          spotId: 10,
          url: 'https://robbreport.com/wp-content/uploads/2021/04/Paris3.jpg?w=1000',
          preview: true,
        },
        {
          spotId: 11,
          url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Crawford_Hill_Mansion.JPG',
          preview: true,
        },
        {
          spotId: 12,
          url: 'https://cdn4.picryl.com/photo/2019/09/26/thistle-hill-one-of-several-cattle-barons-mansions-in-fort-worth-texas-58fb9c-1024.jpg',
          preview: true,
        },
        {
          spotId: 13,
          url: 'https://www.publicdomainpictures.net/pictures/170000/nahled/suburban-house.jpg',
          preview: true,
        },
        {
          spotId: 14,
          url: 'https://c1.wallpaperflare.com/preview/93/139/823/architecture-render-external-design.jpg',
          preview: true,
        },
        {
          spotId: 15,
          url: 'https://seattlemag.com/wp-content/uploads/2021/12/0517_Home1ariel.jpg',
          preview: true,
        },
        {
          spotId: 16,
          url: 'https://live.staticflickr.com/8164/7615606914_057d6bfb72_b.jpg',
          preview: true,
        },
        {
          spotId: 17,
          url: 'https://nimvo.com/wp-content/uploads/2017/08/Firemanhouse10_biz.jpg',
          preview: true,
        },
        {
          spotId: 18,
          url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1194i215%2F3r92jhgx9js24t62rg80fzk107i215&option=N&h=472&permitphotoenlargement=false',
          preview: true,
        },
        {
          spotId: 19,
          url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1194i215%2Fw7xv5dxtyewn44pg5ve1nesae1i215&option=N&h=472&permitphotoenlargement=false',
          preview: true,
        },
        {
          spotId: 20,
          url: 'https://photos.zillowstatic.com/fp/d56b7db0d4695379e80514ac909ae097-p_e.jpg',
          preview: true,
        },
        {
          spotId: 21,
          url: 'https://townsquare.media/site/204/files/2020/06/celebrity-mansions-nashville.jpg',
          preview: true,
        },
        {
          spotId: 22,
          url: 'https://s3.us-east-2.amazonaws.com/havenlifestyles/202029644-1.jpg',
          preview: true,
        },
        {
          spotId: 23,
          url: 'https://www.oregonlive.com/resizer/o9TLlhu3qCWIyDyAu2gbwYp7Iyk=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/2aeac68ccb/width2048/260_2928sewoodstockblvd2032407923.jpeg',
          preview: true,
        },
      ],

      {}

    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, {}, {});
  }

}

// options.tableName = 'SpotImages';

// const { SpotImage, Spot } = require('../models');

// const spotImages = [
//   {
//     spotId: 1,
//     url: 'https://a0.muscache.com/im/pictures/c258b458-1928-4115-899b-4df0a37a9009.jpg?im_w=1200',
//     preview: true,
//   },
//   {
//     spotId: 2,
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-9131225/original/6c44b60d-aedb-48f4-bb3e-8d78d442c660.jpeg?im_w=1200',
//     preview: true,
//   },
//   {
//     spotId: 3,
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=1440',
//     preview: true,
//   },
//   {
//     spotId: 4,
//     url: 'https://a0.muscache.com/im/pictures/f4653805-e0e2-4478-ba40-b74757767bd6.jpg?im_w=1200',
//     preview: true,
//   },
//   {
//     spotId: 5,
//     url: 'https://a0.muscache.com/im/pictures/ed4a1c59-388b-47d1-962d-8e9594073ac7.jpg?im_w=1440',
//     preview: true,
//   }

// ];

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await SpotImage.bulkCreate(options, { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete(options, {}, {});

//   }
// };
