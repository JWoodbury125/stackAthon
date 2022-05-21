"use strict";

const {
  db,
  models: { User, Search },
} = require("../server/db");

async function runSeed() {
  console.log("seeding database...");
  try {
    await db.sync({ force: true });
    console.log("database synced");

    const jennifer = await User.create({
      email: "jenrocks@gmail.com",
      username: "jwoodrocks",
      password: "123",
    });
    await Search.create({
      addressFrom: "1476 Bedford Avenue",
      cityFrom: "Brooklyn",
      stateFrom: "New York",
      zipFrom: "11216",
      lngFrom: -73.9682155,
      latFrom: 40.7618288,
      addressTo: "731 Lexington Avenue",
      cityTo: "New York",
      stateTo: "NY",
      zipTo: "10026",
      lngTo: 40.7616317,
      latTo: -73.9676176,
      userId: jennifer.id,
    });
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  }
}

runSeed();

module.exports = runSeed;
