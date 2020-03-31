const Router = require('express');
const Film = require('../models/Film');

module.exports = Router()

  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find({}, { cast: false, __v: false }).lean()
      .populate('studio', 'name')
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .getSpecificFilmHelper(req.params.id)
      // WISH I COULD POPULATE HERE
      // .then(this.populate('reviews'))
      // .findById(req.params.id, { __v: false }).lean()
      // .populate('studio', 'name')
      // .populate('cast.actor', 'name')
      // .populate('reviews', '-__v')
      // .populate('reviews.reviewer')
      // .populate({ path: 'reviews', select: '-__v', 
      //   populate: { path: 'reviewer', select: '-__v -company'  } })
      .then(film => res.send(film[0]))
      .catch(next);
  });
