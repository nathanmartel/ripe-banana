require('dotenv').config();

const { getReviewer, getFilm, getReview } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('Reviews routes', () => {

  // POST
  it('creates a Review', async() => { 
    const reviewer = await getReviewer();
    const film = await getFilm();
    return request(app)
      .post('/reviews')
      .send({ 
        rating: 3, 
        reviewer: reviewer._id,
        review: 'I give it a solid "meh."',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3, 
          reviewer: reviewer._id.toString(),
          review: 'I give it a solid "meh."',
          film: film._id.toString(),
          __v: 0
        });
      });   
  });

  // GET ALL
  it('gets all Reviews', () => {
    return request(app)
      .get('/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
        expect(res.body).toContainEqual({ 
          _id: expect.any(String), 
          rating: expect.any(Number), 
          review: expect.any(String),
          film: { _id: expect.any(String), title: expect.any(String) } 
        }); 
      }); 
  });

  // GET ALL - Alternate version via static method 
  it('gets all Reviews (alternate version)', () => {
    return request(app)
      .get('/reviews/top100')
      .then(res => {
        expect(res.body).toHaveLength(100);
        expect(res.body).toContainEqual({ 
          _id: expect.any(String), 
          rating: expect.any(Number), 
          review: expect.any(String),
          film: { _id: expect.any(String), title: expect.any(String) } 
        }); 
      }); 
  });

  // DELETE
  it('deletes a Review', async() => {
    const review = await getReview();
    return request(app)
      .delete(`/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      }); 
  });

});
