const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Folder extends Model {}

Folder.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    // REVIEW: What's the purpose of this field?
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
