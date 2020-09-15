const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "****",
  database: "MyReceipts_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
