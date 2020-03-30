const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    min: 1900,
    max: 2020,
    required: true
  },
  cast: [{
    role: {
      type: String
    },
    actor: {
      type: mongoose.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', filmSchema);
