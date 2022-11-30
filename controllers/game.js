const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Game = require("../models/game");

const create = async (req, res, next) => {
  const game = req.body;
  const takenTitle = await Game.findOne({ title: game.title });

  if (takenTitle) {
    res.json({ message: "title taken" });
    return null;
  }

  const dbGame = new Game({
    title: game.title.toLowerCase(),
    username: game.username,
    environmentData: game.environmentData,
    spawnData: game.spawnData,
    imageOverlay: game.imageOverlay,
  });

  dbGame.save();

  res.json({ message: "game successfully created!", body: req.body });
};

const save = async (req, res, next) => {
  const game = req.body;
  const takenTitle = await Game.updateOne(
    { title: game.title },
    {
      $set: {
        title: game.title,
        username: game.username,
        environmentData: game.environmentData,
        spawnData: game.spawnData,
        imageOverlay: game.imageOverlay,
      },
    }
  );

  // if (takenTitle) {
  //   res.json({ message: "title taken" });
  //   return null;
  // }

  // const dbGame = new Game({
  //   title: game.title,
  //   username: game.username,
  //   environmentData: game.environmentData,
  //   spawnData: game.spawnData,
  //   imageOverlay: game.imageOverlay,
  // });

  res.json({
    message: "game successfully saved!",
    body: req.body,
    takenTitle,
  });
};

const loadOne = (req, res, next) => {
  const id = req.query._id;

  Game.findOne({ id }).then((game) => {
    if (!game) {
      return res.json({
        message: "No games found by that id",
      });
    }
    res.json({ message: `game found!`, game });
  });
};

const list = (req, res, next) => {
  const username = req.query.username;

  Game.find({ username }).then((games) => {
    if (!games) {
      return res.json({
        message: "No games found",
      });
    }
    res.json({ message: `${games.length} games found!`, games });
  });
};

module.exports = { create, loadOne, list, save };
