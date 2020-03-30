require('dotenv').config();

const { getReviewer } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Reviewer routes', () => {

  // POST
  it('creates a Reviewer', () => { 
    return request(app)
      .post('/reviewers')
      .send({ 
        name: 'Roger Ebert',
        company: 'Chicago Sun Times'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'Chicago Sun Times',
          __v: 0
        });
      });   
  });

  // GET ALL
  it('gets all Reviewers', () => {
    return request(app)
      .get('/reviewers')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }, 
          { _id: expect.any(String), name: expect.any(String), company: expect.any(String) }
        ]);
      }); 
  });

  // GET ONE
  it('gets a specific Reviewer', async() => {
    const reviewer = await getReviewer();
    
    return request(app)
      .get(`/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: reviewer.name,
          company: reviewer.company
        }); 
      });
  });

  // PATCH
  it('updates a specific Reviewer', async() => {
    const reviewer = await getReviewer();
    
    return request(app)
      .patch(`/reviewers/${reviewer._id}`)
      .send({ company: 'Chicago Tribune' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          company: 'Chicago Tribune'
        }); 
      });
  });

});
