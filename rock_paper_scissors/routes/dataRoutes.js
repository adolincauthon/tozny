const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router();

//get winner for a round
router.get('/:user/round', async (req, res) => {
  let { user } = req.params;
  user = user.toLowerCase();
  try {
    const rounds = require('../config/round.json');
    const round = rounds[user];
    res.status(200).json({ round: round });
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });s
  }
});
module.exports = router;
