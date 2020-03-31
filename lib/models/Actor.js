const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
}, { toJSON: { 
  virtuals: true,
  transform: (doc, ret) => { delete ret.id; }  
} 
});

actorSchema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.actor'
});

actorSchema.statics.getSpecificActor = function(reqId) {
  const reqIdObj = mongoose.Types.ObjectId(reqId);
  return this
    .aggregate([
      {
        '$match': { '_id': { '$in': [reqIdObj] } }
      }, {
        '$lookup': {
          'from': 'films', 
          'localField': '_id', 
          'foreignField': 'cast.actor', 
          'as': 'films'
        }
      }, {
        '$project': {
          '_id': false, 
          '__v': false, 
          'films.studio': false, 
          'films.cast': false, 
          'films.__v': false
        }
      }
    ]);
};

module.exports = mongoose.model('Actor', actorSchema);
