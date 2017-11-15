import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';

chai.use(chaiHttp);

describe('Tests for more-recipes API endpoints', () => {
  describe('Handle all required endpoints', () => {
    describe('GET api/v1/recipes', () => {
      it('should GET all recipes', (done) => {
        chai.request(app).get('/api/v1/recipes').end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });

      it('should not GET any recipes', (done) => {
        chai.request(app).get('/api/v1/recipes/100').end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
      });
    });

    describe('GET api/v1/recipes/:id', () => {
      it('should GET a recipe', (done) => {
        chai.request(app).get('/api/v1/recipes/1').end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });
    });

    describe('About page', () => {
      it('should return true if "About" page does not exist', () => {
        chai.request('/api/v1/about', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });

      it('should return true if "Contact" page does not exist', () => {
        chai.request('/api/v1/contact', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });
    });
  });
});
