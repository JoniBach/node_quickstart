const Game = require("../models/game");
const { ObjectId } = require("mongodb");

const create = async (req, res, next) => {
  const game = req.body;
  const takenTitle = await Game.findOne({ title: game.title });

  if (takenTitle) {
    res.json({ message: "title taken" });
    return null;
  }

  // const image = Buffer.from(game.imageOverlay, "base64");

  const dbGame = new Game({
    title: game.title.toLowerCase(),
    username: game.username,
    cellQuantity: game.cellQuantity,
    environmentData: game.environmentData,
    spawnData: game.spawnData,
    // imageOverlay: image,
  });

  dbGame.save();

  res.json({ message: "game successfully created!", body: req.body });
};

const save = async (req, res, next) => {
  const game = req.body;
  console.log(game);
  const takenTitle = await Game.updateOne(
    { title: game.title },
    {
      $set: {
        title: game.title,
        cellQuantity: game.cellQuantity,
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

  Game.findOne({ _id: ObjectId(id) }).then((game) => {
    if (!game) {
      return res.json({
        message: "No games found by that id",
      });
    }

    // const data = {
    //   ...game,
    //   imageOverlay: game.imageOverlay.toString("base64"),
    // };
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
