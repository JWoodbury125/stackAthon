const router = require("express").Router();
const User = require("../db/models/User");

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

router.get("/tryit", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (err) {
    next(err);
  }
});
