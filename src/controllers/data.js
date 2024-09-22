

const { Score } = require("../models/score");

const addScore = async (req, res, next) => {
  try {
    const { nanoid } = await import('nanoid');
    const uniqueId = nanoid();

    const newUser = await Score.create({ 
      id: uniqueId,
      ...req.body
    });

    res.status(201).json({
      user: {
        id: newUser.id,
        score: newUser.score,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getScores = async (req, res, next) => {
  try {
    const users = await Score.find(req);
    res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addScore,
  getScores,
};