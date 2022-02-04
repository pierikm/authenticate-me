'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    rideId: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Ride, { foreignKey: "rideId" });
  };
  return Review;
};
