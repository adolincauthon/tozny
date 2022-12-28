const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router();

const User = require('../schemas/User');

//get winner for a round
router.get('/:user/round', async (req, res) => {
  let { user } = req.params;
  console.log(user);
  const id =
    user.toLowerCase() === 'alicia'
      ? '63ab8c0e3d586be62e791fb7'
      : '63ab8c0e3d586be62e791fb8';
  try {
    const dbUser = await User.findById(id);
    console.log(dbUser);
    res.status(200).json({ round: dbUser.round });
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
});

module.exports = router;
