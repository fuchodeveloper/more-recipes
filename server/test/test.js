import { describe, it } from 'mocha';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('Tests for more-recipes API endpoints', () => {
  describe('Handle valid endpoints', () => {
    describe('GET api/v1/recipes', () => {
      it('it should GET all recipes', (done) => {
        chai.request(app).get('/api/v1/recipes').end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });
    });

    describe('GET api/v1/recipes/:recipeId', () => {
      it('it should GET a recipe', (done) => {
        chai.request(app).get('/api/v1/recipes/1').end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });
    });

    describe('POST api/v1/recipes', () => {
      it('it should use POST to add recipes', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe('PUT api/v1/recipes/:recipeId', () => {
      it('it should use PUT to update a recipe', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/1')
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe('DELETE api/v1/recipes/:recipeId', () => {
      it('it should DELETE a recipe', (done) => {
        chai.request(app).delete('/api/v1/recipes/1').end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('Handle invalid endpoints', () => {
    describe('About page', () => {
      it('it should return true if "About" page does not exist', () => {
        chai.request('/api/v1/about', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });
    });

    describe('Contact page', () => {
      it('it should return true if "Contact" page does not exist', () => {
        chai.request('/api/v1/contact', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });
    });

    describe('GET api/v1/recipes', () => {
      it('it should GET all recipes returns false', (done) => {
        chai.request(app).get('/api/v1/recipe').end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
      });
    });

    describe('POST api/v1/recipes', () => {
      it('it should use POST to add recipes should return false', (done) => {
        chai.request(app)
          .post('')
          .end((error, response) => {
            expect(response).to.have.status(404);
            done();
          });
      });
    });

    describe('PUT api/v1/recipes/:recipeId', () => {
      it('it should use PUT to update a recipe return false', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/1000')
          .end((error, response) => {
            expect(response).to.have.status(404);
            done();
          });
      });
    });

    describe('DELETE api/v1/recipes/:recipeId', () => {
      it('it should DELETE a recipe returns false', (done) => {
        chai.request(app).delete('/api/v1/recipes/10000').end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
      });
    });


    describe('DELETE api/v1/recipes/:recipeId/:recipeId', () => {
      it('it should DELETE multiple recipes returns false', (done) => {
        chai.request(app).delete('/api/v1/recipes/1000/1000').end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
      });
    });
  });
});
