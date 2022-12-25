const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv').config();
const {
  load_client,
  write_message,
  share_with_group,
  read_message,
} = require('../functionality/tozny');
const router = express.Router();

//post move to the backend and share with appropriate group
router.post('/:user/:round/:move', async (req, res) => {
  let { user, round, move } = req.params;
  user = user.toLowerCase();
  try {
    const client = await load_client(user);
    const success = await write_message(client, user, round, move);
    if (success) {
      let groupId;
      switch (user) {
        case 'bruce':
          groupId = process.env.BRUCE_CLARENCE;
          break;
        case 'alicia':
          groupId = process.env.ALICE_CLARENCE;
          break;
        default:
          throw 'Invalid user';
      }
      const shared = await share_with_group(client, groupId, user);
      console.log(shared);
      if (!shared) {
        throw 'Error sharing with group';
      }
      const rounds = require('../config/round.json');
      rounds[user] += 1;
      let data = JSON.stringify(rounds);
      fs.writeFileSync('../config/round.json', data);

      res.status(200).json({ turn: 'completed' });
    } else {
      throw 'Error saving message';
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// read round data from tozny store and post winner
// to shared winner group record
router.post('/:user/round/:round', async (req, res) => {
  try {
    let { user, round } = req.params;
    user = user.toLowerCase();

    if (user !== 'clarence') {
      res.status(403).json({ error: 'Only the judge can declare a winner.' });
      return;
    }

    const client = load_client(user);
    const aliciaMove = await read_message(
      client,
      process.env.ALICE_CLARENCE,
      user,
      round
    );
    const bruceMove = await read_message(
      client,
      process.env.BRUCE_CLARENCE,
      user,
      round
    );
    let winner = '';
    console.log(`Alicia: ${aliciaMove}`);
    console.log(`Bruce: ${bruceMove}`);

    switch (aliciaMove) {
      case 'rock':
        if (bruceMove === 'rock') {
          winner = 'Tie';
        } else if (bruceMove === 'paper') {
          winner = 'Bruce';
        } else {
          winner = 'Alicia';
        }
        break;
      case 'paper':
        if (bruceMove === 'rock') {
          winner = 'Alicia';
        } else if (bruceMove === 'paper') {
          winner = 'Tie';
        } else {
          winner = 'Bruce';
        }
        break;
      case 'scissors':
        if (bruceMove === 'rock') {
          winner = 'Bruce';
        } else if (bruceMove === 'paper') {
          winner = 'Alicia';
        } else {
          winner = 'Tie';
        }
        break;
      default:
        throw 'Illegal Move';
    }

    const success = await write_message(client, user, round, winner);
    console.log(success);
    const shared = await share_with_group(
      client,
      process.env.WINNER_GROUP,
      user
    );
    console.log(shared);
    if (success && shared) {
      res.status(200).json({ winner: winner });
    } else {
      throw 'Error saving data to Tozny store';
    }
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
});

// get user's move for a specific round
router.get('/:user/round/:round', async (req, res) => {
  try {
    let { user, round } = req.params;
    user = user.toLowerCase();
    const client = await load_client(user);

    let groupId;
    switch (user) {
      case 'bruce':
        groupId = process.env.BRUCE_CLARENCE;
        break;
      case 'alicia':
        groupId = process.env.ALICE_CLARENCE;
        break;
      case 'clarence':
        groupId = process.env.WINNER_GROUP;
      default:
        throw 'Invalid user';
    }
    const move = await read_message(client, groupId, user, round);
    if (move) {
      res.status(200).json({ move: move });
    } else {
      res.status(404).json({ error: `Round ${round} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error}` });
  }
});

//get winner for a round
router.get('/winner/:user/:round', async (req, res) => {
  try {
    let { user, round } = req.params;
    user = user.toLowerCase();

    const client = load_client(user);
    const winner = await read_message(
      client,
      process.env.WINNER_GROUP,
      user,
      round
    );

    if (winner) {
      res.status(200).json({ winner: winner });
    } else {
      throw 'Could not find winner';
    }
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
});
module.exports = router;
