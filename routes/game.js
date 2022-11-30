//1 st step
const express = require("express");

//2nd step
const router = express.Router();

//3rd step
const controller = require("../controllers/game");

//4th step
router.post("/create", controller.create);
router.get("/load-one", controller.loadOne, (req, res) => {
  res.json(req);
});
router.get("/list", controller.list, (req, res) => {
  res.json(req);
});

router.put("/save", controller.save);

//5th step
module.exports = router;
