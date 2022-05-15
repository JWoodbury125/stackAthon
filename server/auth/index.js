const router = require("express").Router();
const { User } = require("../db");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.autenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
