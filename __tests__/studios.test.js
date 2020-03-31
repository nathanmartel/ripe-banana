require('dotenv').config();

const { getStudio } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Studio routes', () => {

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

  // GET ALL
  it('gets all Studios', () => {
    return request(app)
      .get('/studios')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }
        ]);
      }); 
  });

  // GET ONE
  it('gets a specific Studios', async() => {
    const studio = await getStudio();
    
    return request(app)
      .get(`/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: studio._id,
          name: studio.name,
          address: studio.address
        }); 
      });
  });

});
