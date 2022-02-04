'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    rideId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Booking.associate = function (models) {
    Booking.hasOne(models.Ride, { foreignKey: "rideId" });
    Booking.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Booking;
};
