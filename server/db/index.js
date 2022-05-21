const db = require("./db");
const User = require("./models/User");
const Search = require("./models/Search");

User.hasMany(Search);
Search.belongsTo(User);

module.exports = { db, models: { User, Search } };
