import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testData from './helper/testData';
import app from '../index';

chai.use(chaiHttp);
let userToken, recipe;

describe('Recipe favorites', () => {
  it('should return 201 if user is created', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(testData.favoriteNewUser)
      .end((err, res) => {
        userToken = res.body.token;
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('Recipe controller', () => {
  it('should return 500 if request cannot be fulfilled', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${'wrong'}/recipes`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

  it('should return 201 if user creates recipe successfully', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send(testData.newRecipe)
      .end((err, res) => {
        recipe = res.body.recipe.id;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 201 if a favorite is successfully created', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${recipe}/recipes`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 201 if a favorite is successfully created', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${''}/recipes`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

