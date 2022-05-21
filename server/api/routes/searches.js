const router = require("express").Router();
const {
  models: { User, Search },
} = require("../../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const searches = await Search.findAll({
      include: User,
    });
    res.json(searches);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Search.create(req.body));
  } catch (err) {
    next(err);
  }
});
