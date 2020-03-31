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

  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id, { __v: false }).lean()
      .then(review => res.send(review))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Review
      .findByIdAndUpdate(req.params.id, req.body, { new: true }).lean()
      .then(review => res.send(review))
      .catch(next);
  });
