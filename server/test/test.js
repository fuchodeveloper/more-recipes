import { describe, it } from 'mocha';
import { assert, equal, notEqual, expect } from 'chai';
import { request } from 'request';
import chaiHttp from 'chai-http';
import chai from 'chai';
const app = require("../app");
chai.use(chaiHttp);

describe('Tests for more-recipes API endpoints', () => {

    describe('Handle valid endpoints', () => {
        describe('GET api/v1/recipes', () => {
            it('it should GET all recipes', (done) => {
                chai.request(app)
                    .get('/api/v1/recipes')
                    .end((error, response) => {
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


    });

    describe('Handle invalid endpoints', () => {
        describe ('About page', () => {
            it('it should return true if "About" page does not exist', () => {
                chai.request('http://localhost:3000/api/v1/about', (error, response, body) => {
                    expect(response.statusCode).to.equal(404);
                });
            });
        });

        describe ('Contact page', () => {
            it('it should return true if "Contact" page does not exist', () => {
                chai.request('http://localhost:3000/api/v1/contact', (error, response, body) => {
                    expect(response.statusCode).to.equal(404);
                });
            });
        });

    });

});