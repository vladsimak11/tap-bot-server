const express = require('express');
const router = express.Router();

const { addScore, getScores } = require("../../controllers/data");

// router.get('/scores', getScore);
router.post('/scores', addScore);
router.get('/scores', getScores);

module.exports = router;