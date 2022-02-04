'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    rideId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.Ride, { foreignKey: "rideId" });
  };
  return Image;
};
