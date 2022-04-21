'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    speed: DataTypes.INTEGER,
    travelType: DataTypes.STRING
  }, {});
  Ride.associate = function (models) {
    Ride.hasMany(models.Review, { foreignKey: "rideId", onDelete: 'CASCADE', hooks: true });
    Ride.hasMany(models.Image, { foreignKey: "rideId", onDelete: 'CASCADE', hooks: true });
    Ride.hasMany(models.Booking, { foreignKey: "rideId", onDelete: 'CASCADE', hooks: true });
    Ride.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Ride;
};
