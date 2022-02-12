'use strict';

const images = [
  {
    rideId: 1,
    url: 'https://media.wired.com/photos/5932660fedfced5820d100f9/master/w_2560%2Cc_limit/Kitt-2.png',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 1,
    url: 'https://cdn.cnn.com/cnnnext/dam/assets/210116150915-david-hasselhoff-kitt-car-restricted-large-169.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 2,
    url: 'https://www.airforcemag.com/app/uploads/2020/04/Air-Force-1-Test-2.png',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 2,
    url: 'https://www.airforcemag.com/Image/Features/PublishingImages/2017/August%202017/Air_Force_One_on_the_ground.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 2,
    url: 'https://images05.military.com/sites/default/files/2021-06/mil-Air-Force-One-1800.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 3,
    url: 'https://cdna.artstation.com/p/assets/images/images/000/015/772/large/black-raven-fell-beast-in-mordor.jpg?1400275069',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 3,
    url: 'https://artfiles.alphacoders.com/133/thumb-1920-133317.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 3,
    url: 'https://www.thetolkienforum.com/wiki-asset/x,qpid=749.pagespeed.ic.IU_gyAYpvO.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 4,
    url: 'https://cdn.mos.cms.futurecdn.net/B5NYJSfSwyA66WRKDPtNY3-1200-80.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 4,
    url: 'https://preview.redd.it/859lbclpb4j41.jpg?auto=webp&s=e1949b04e31dda3ccc3ecfbb7e8cf6c66842d119',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 5,
    url: 'https://sportshub.cbsistatic.com/i/2021/03/17/9ec01251-4341-459a-9bc2-c222ea9f7418/spongebob-squarepants-boulder-1177707.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 5,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWQcwRx-KUWHn-PiWSSA8nQ8t2D7j6slyMhMLShZGJo_CKvqFOZFh_ZSsYt3zYY8I5us&usqp=CAU',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 5,
    url: 'http://i1.ytimg.com/vi/yTOwMeimSl4/hqdefault.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 6,
    url: 'https://lumiere-a.akamaihd.net/v1/images/databank_anakinskywalkerspodracer_01_169_fe359d32.jpeg?region=0%2C0%2C1560%2C878&width=960',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    rideId: 6,
    url: 'https://lumiere-a.akamaihd.net/v1/images/databank_anakinskywalkerspodracer_01_169_fe359d32.jpeg?region=0%2C0%2C1560%2C878&width=960',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', images, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
