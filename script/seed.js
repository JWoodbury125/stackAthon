"use strict";

const {
  db,
  models: { User },
} = require("../server/db");

async function runSeed() {
  console.log("seeding database...");
  try {
    await db.sync({ force: true });
    console.log("database synced");

    await User.create({
      email: "jenrocks@gmail.com",
      username: "jwoodrocks",
      password: "123",
    });
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  }
}

runSeed();

module.exports = runSeed;
