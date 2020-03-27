require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Studio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // POST
  it('creates a Studio', () => { 
    return request(app)
      .post('/studios')
      .send({ 
        name: 'Studio Ghibli',
        address: {
          city: 'Tokyo',
          state: 'Koganei',
          country: 'Japan'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Studio Ghibli',
          address: {
            city: 'Tokyo',
            state: 'Koganei',
            country: 'Japan',
          },
          __v: 0
        });
      });   
  });

});
