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

const loadOne = (req, res, next) => {
  // const userLoggingIn = req.body;

  // User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
  //   if (!dbUser) {
  //     return res.json({
  //       message: "Invalid username or password",
  //     });
  //   }
  //   bcrypt
  //     .compare(userLoggingIn.password, dbUser.password)
  //     .then((isCorrect) => {
  //       if (isCorrect) {
  //         const payload = {
  //           id: dbUser._id,
  //           username: dbUser.username,
  //         };
  //         jwt.sign(
  //           payload,
  //           process.env.JWT_SECRET,
  //           { expiresIn: 86400 },
  //           (err, token) => {
  //             console.log(err);
  //             if (err) return res.json({ message: err });

  //             return res.json({
  //               message: "Success",
  //               token: "Bearer " + token,
  //             });
  //           }
  //         );
  //       } else {
  //         return res.json({
  //           message: "Invalid Username or Password",
  //         });
  //       }
  //     });
  // });
  res.json({ message: "this endpoint is not ready yet" });
};

const list = (req, res, next) => {
  // const userLoggingIn = req.body;

  // User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
  //   if (!dbUser) {
  //     return res.json({
  //       message: "Invalid username or password",
  //     });
  //   }
  //   bcrypt
  //     .compare(userLoggingIn.password, dbUser.password)
  //     .then((isCorrect) => {
  //       if (isCorrect) {
  //         const payload = {
  //           id: dbUser._id,
  //           username: dbUser.username,
  //         };
  //         jwt.sign(
  //           payload,
  //           process.env.JWT_SECRET,
  //           { expiresIn: 86400 },
  //           (err, token) => {
  //             console.log(err);
  //             if (err) return res.json({ message: err });

  //             return res.json({
  //               message: "Success",
  //               token: "Bearer " + token,
  //             });
  //           }
  //         );
  //       } else {
  //         return res.json({
  //           message: "Invalid Username or Password",
  //         });
  //       }
  //     });
  // });
  res.json({ message: "this endpoint is not ready yet" });

  return null;
};

module.exports = { create, loadOne, list };
