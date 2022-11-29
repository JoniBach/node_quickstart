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
  console.log(req);
  res.json(req.game);
});

//5th step
module.exports = router;
