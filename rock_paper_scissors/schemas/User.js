const mongoose = require('mongoose');

const ToznySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', ToznySchema);
