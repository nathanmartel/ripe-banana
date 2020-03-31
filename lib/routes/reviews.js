const Router = require('express');
const Review = require('../models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find({}, { __v: false, reviewer: false })
      .limit(100)
      .sort({ 'rating': -1 })
      .populate('film', 'title')
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .get('/top100', (req, res, next) => {
    Review
      .getTop(100)
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
