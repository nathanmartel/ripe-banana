const Router = require('express');
const Studio = require('../models/studio');

module.exports = Router()

  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find({}, { name: true }).lean()
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id, { __v: false }).lean()
      .then(studio => res.send(studio))
      .catch(next);
  });
