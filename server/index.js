const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }

    app.listen(PORT, () =>
      console.log(`Seeded data and listening on port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

init();
