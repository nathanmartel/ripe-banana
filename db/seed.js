const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 5 } = {}) => {
  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country({ full: true }),
    }
  })));
};
