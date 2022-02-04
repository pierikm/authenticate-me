'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    userId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    speed: DataTypes.INTEGER,
    travelType: DataTypes.STRING
  }, {});
  Ride.associate = function (models) {
    Ride.hasMany(models.Review, { foreignKey: "rideId" });
    Ride.hasMany(models.Image, { foreignKey: "rideId" });
    Ride.belongsTo(models.Booking, { foreignKey: "rideId" });
    Ride.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Ride;
};
