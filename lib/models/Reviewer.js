const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: { 
    virtuals: true,
    transform: (doc, ret) => { delete ret.id; } 
  }
});

reviewerSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});


// No dice...
// reviewerSchema.pre('deleteOne', { query: false, document: true }, function() {
//   console.log(this);
//   // this.populate('reviews');
//   if(this.reviews.length !== 0) {
//     throw new Error('Error: Cannot delete reviewer with existing reviews.');
//   }
// });


module.exports = mongoose.model('Reviewer', reviewerSchema);
