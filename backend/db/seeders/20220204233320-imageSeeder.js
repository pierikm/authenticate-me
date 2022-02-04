'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [{
      rideId: 1,
      url: 'https://media.wired.com/photos/5932660fedfced5820d100f9/master/w_2560%2Cc_limit/Kitt-2.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
