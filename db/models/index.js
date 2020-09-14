const User = require("./User");
const Folder = require("./Folder");
const Receipt = require("./Receipt");

User.hasMany(Folder, { as: "folder", foreignKey: "userId", allowNull: false });
Folder.belongsTo(User, { as: "user" });

Folder.hasMany(Receipt, {
  as: "receipt",
  foreignKey: "folderId",
  allowNull: false,
});
Receipt.belongsTo(Folder, { as: "folder" });

module.exports = {
  User,
  Folder,
  Receipt,
};
