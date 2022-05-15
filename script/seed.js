"use strict";

const {
  db,
  models: { User },
} = require("../server/db");

async function seed() {
  try {
    await db.sync({ force: true });
    console.log("database seeded");

    const jennifer = await User.create({
      firstName: "Jennifer",
      lastName: "Woodbury",
      email: "jenrocks@gmail.com",
      username: "jwood",
      password: "123",
    });
  } catch (err) {
    console.log(err);
  }
}

async function runSeed() {
  console.log("seeding database...");
  try {
    await seed();
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed finally");
  }
}

runSeed();
