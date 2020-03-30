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
      .findById(req.params.id, { _id: false, __v: false }).lean()
      .populate('studio', 'name')
      .populate('cast')
      .populate({ path: 'cast',
        populate: { path: 'actor', model: 'Actor' }
      })
      .then(film => res.send(film))
      .catch(next);
  });
