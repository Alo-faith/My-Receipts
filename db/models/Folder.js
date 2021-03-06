const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Folder extends Model {}

Folder.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    pin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    defaultFolder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Folder;
