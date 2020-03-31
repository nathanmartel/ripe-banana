const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

reviewSchema.statics.getTop = function(number = 1) {
  return this
    .aggregate([
      {
        '$sort': {
          'rating': -1
        }
      }, {
        '$limit': number
      }, {
        '$lookup': {
          'from': 'films', 
          'localField': 'film', 
          'foreignField': '_id', 
          'as': 'film'
        }
      }, {
        '$unwind': {
          'path': '$film'
        }
      }, {
        '$project': {
          'reviewer': false, 
          'film.studio': false, 
          'film.released': false, 
          'film.cast': false, 
          'film.__v': false, 
          '__v': false
        }
      }
    ]);
};

module.exports = mongoose.model('Review', reviewSchema);
