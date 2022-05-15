const pkg = require("../../package.json");
const Sequelize = require("sequelize");
const databaseName = pkg.name;
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/${databaseName}`
);

module.exports = db;
