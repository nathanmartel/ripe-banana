require('dotenv').config();

const { getActor, getActors, getStudio, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Film routes', () => {

  // POST
  it('creates a Film', async() => { 
    const actor = await getActor();
    const studio = await getStudio();
    return request(app)
      .post('/films')
      .send({ 
        title: 'Pi',
        studio: studio._id,
        released: 2000,
        cast: [{
          role: 'Max Cohen',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Pi',
          studio: studio._id.toString(),
          released: 2000,
          cast: [{
            _id: expect.any(String),
            role: 'Max Cohen',
            actor: actor._id.toString()
          }],
          __v: 0
        });
      });   
  });

  // GET ALL
  it('gets all Films', () => {
    return request(app)
      .get('/films')
      .then(res => {
        expect(res.body).toHaveLength(9);
        expect(res.body).toContainEqual(
          { _id: expect.any(String), title: expect.any(String), released: expect.any(Number),
            studio: { _id: expect.any(String), name: expect.any(String) } }); 
      }); 
  });

  // GET ONE
  // Still getting actors to display fully, sorry
  // it('gets a specific Film', async() => {
  //   const film = await getFilm();
  //   const studio = await getStudio({ _id: { $in: film.studio } });
    
  //   const actor = await getActor({ _id: { $in: film.cast[0].actor } });
  //   const actors = film.cast.map(cast => cast.actor);
  //   console.log('actors is', actors);
  //   console.log('actor is', actor);

  //   console.log('film is', film);

  //   return request(app)
  //     .get(`/films/${film._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({          
  //         title: film.title,
  //         released: film.released,
  //         studio: { 
  //           _id: studio._id.toString(),
  //           name: studio.name
  //         },
  //         cast: [{
  //           id: expect.any(String),
  //           role: expect.any(String),
  //           actor: {
  //             _id: actor._id.toString(),
  //             name: expect.any(String)
  //           }
  //         }]
  //       }); 
  //     });
  // });

});
