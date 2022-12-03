const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    username: {
      type: String,
      reuqired: true,
    },
    title: {
      type: String,
      reuqired: true,
    },
    environmentData: {
      type: Array,
      reuqired: true,
    },
    spawnData: {
      type: Array,
      reuqired: true,
    },
    cellQuantity: {
      type: Number,
      reuqired: true,
    },
    // imageOverlay: {
    //   type: Buffer,
    //   reuqired: false,
    // },
  },
  { timestamps: true }
);
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
