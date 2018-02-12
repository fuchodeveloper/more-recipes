import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../index';
import db from '../models';

chai.use(chaiHttp);

const { Reviews } = db;

let userToken;

const doBeforeAll = () => {
  before((done) => {
    Reviews.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};
const doBeforeEach = () => {
  beforeEach((done) => {
    db.sequelize.sync();
    done();
  });
};

describe('Reviews controller', () => {
  doBeforeAll();
  doBeforeEach();

  it(`should return success 
  message and token if user signin is successful`, (done) => {
      const user = {
        emailAddress: mock.newUser.emailAddress,
        password: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.body.message).to.equal('Log in successful');
          expect(res.body).to.have.property('token');
          expect(res).to.have.status(200);
          done();
        });
    });

  it(`should return recipe name if user creates review
    successfully`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          review: 'Lovely recipe idea!'
        })
        .end((err, res) => {
          expect(res.body.recipe.Reviews[0].review)
            .to.equal('Lovely recipe idea!');
          expect(res.body.recipe.Reviews).to.be.an('array');
          expect(res).to.have.status(201);
          done();
        });
    });

  it(`should error message if creating review 
  fails due to validation error`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          review: 'i'
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('review is required');
          expect(res).to.have.status(400);
          done();
        });
    });

  it(`should error message if creating review 
  fails due to validation error`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes/988/reviews')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          review: 'nice recipe'
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('Recipe not found.');
          expect(res).to.have.status(404);
          done();
        });
    });
});
