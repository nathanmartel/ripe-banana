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

// filmSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'film'
// });

filmSchema.statics.getSpecificFilmHelper = function(reqId) {
  // const reqIdObj = mongoose.Types.ObjectId(reqId);
  return this
    .aggregate([
      {
        '$match': { '_id': mongoose.Types.ObjectId(reqId) }
      }, {
        '$lookup': {
          'from': 'studios', 
          'localField': 'studio', 
          'foreignField': '_id', 
          'as': 'studio'
        }
      }, 
      // $lookup on child of cast wipes out its siblings?!
      {
        '$lookup': {
          'from': 'actors', 
          'localField': 'cast.actor', 
          'foreignField': '_id', 
          'as': 'cast.actor'
        }
      }, 
      {
        // $lookup on a virtual doesn't work?
        '$lookup': {
          'from': 'reviews', 
          'localField': 'reviews', 
          'foreignField': '_id', 
          'as': 'reviews'
        }
      }, {
        '$unwind': '$studio'
      }, 
      {
        '$project': {
          '_id': false,
          '__v': false,
          'cast.actor.__v': false,
          'cast.actor.dob': false,
          'cast.actor.pob': false,
          'studio.__v': false,
          'studio.address': false,
        }
      }
    ]);
};

module.exports = mongoose.model('Film', filmSchema);
