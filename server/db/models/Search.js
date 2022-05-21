const Sequelize = require("sequelize");
const db = require("../db");

const Search = db.define("search", {
  addressFrom: {
    type: Sequelize.STRING,
  },
  cityFrom: {
    type: Sequelize.STRING,
  },
  stateFrom: {
    type: Sequelize.STRING,
  },
  zipFrom: {
    type: Sequelize.STRING,
  },
  lngFrom: {
    type: Sequelize.DECIMAL,
  },
  latFrom: {
    type: Sequelize.DECIMAL,
  },
  addressTo: {
    type: Sequelize.STRING,
  },
  cityTo: {
    type: Sequelize.STRING,
  },
  stateTo: {
    type: Sequelize.STRING,
  },
  zipTo: {
    type: Sequelize.STRING,
  },
  lngTo: {
    type: Sequelize.DECIMAL,
  },
  latTo: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = Search;
