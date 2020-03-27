const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 5, actorsToCreate = 5 } = {}) => {
  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country({ full: true }),
    }
  })));

  await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city() + ', ' + chance.state()
  })));
};
