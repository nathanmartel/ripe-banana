require('dotenv').config();

const { getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Actor routes', () => {

  // POST
  it('creates an Actor', () => { 
    return request(app)
      .post('/actors')
      .send({ 
        name: 'Tom Cruise',
        dob: new(Date),
        pob: 'Hollywood, California'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Tom Cruise',
          dob: expect.any(String),
          pob: 'Hollywood, California',
          __v: 0
        });
      });   
  });

  // GET ALL
  it('gets all Actors', () => {
    return request(app)
      .get('/actors')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String) }
        ]);
      }); 
  });

  // GET ONE
  it('gets a specific Actor', async() => {
    const actor = await getActor();
    
    return request(app)
      .get(`/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual([{
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob,
          films: expect.arrayContaining([{
            _id: expect.any(String),
            title: expect.any(String),
            released: expect.any(Number)
          }])
        }]); 
      });
  });

});
