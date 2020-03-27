const Router = require('express');
const Studio = require('../models/studio');

module.exports = Router()

  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  });
