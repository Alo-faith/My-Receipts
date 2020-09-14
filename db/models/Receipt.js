const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Receipt extends Model {}

Receipt.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    Expdate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Receipt;
