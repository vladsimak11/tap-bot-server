const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const scoreSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },

    score: {
      type: Number,
      required: true
    },
  },
  { versionKey: false, timestamps: true }
);

scoreSchema.post("save", handleMongooseError);

const Score = model("scores", scoreSchema);

module.exports = {
  Score,
};