const { getActor } = require('./data-helpers');

const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 3, actorsToCreate = 5, reviewersToCreate = 7, filmsToCreate = 9 } = {}) => {
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country({ full: true }),
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city() + ', ' + chance.state()
  })));

  await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.animal() + chance.animal(),
    studio: chance.pickone(studios)._id,
    released: chance.integer({ min: 1900, max: 2020 }),
    cast: [...Array(2)].map(() => ({
      role: chance.name(),
      actor: chance.pickone(actors)._id
    }))
  })));
};
