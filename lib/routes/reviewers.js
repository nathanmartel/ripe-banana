const Router = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find({}, { __v: false }).lean()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id, { __v: false })
      // This is the dumbest, most inconsistent syntax yet
      .populate({ path: 'reviews', select: 'rating review -reviewer', 
        populate: { path: 'film', select: 'title' } 
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true }).lean()
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      // A bunch of stuff I tried... 
      // findByIdAndDelete not triggering pre('remove') middleware?
      // .findByIdAndDelete(req.params.id)
      // .findOne({ _id: req.params.id })
      // .populate('reviews')
      // .deleteOne(this)
      // .deleteOne({ _id: req.params.id })
      .findById(req.params.id)
      .populate('reviews')
      .deleteOne({ 'reviews': { $exists: false } })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
