import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../index';
import db from '../models';

chai.use(chaiHttp);

const { Favorites } = db;

let userToken;

const doBeforeAll = () => {
  before((done) => {
    Favorites.destroy({
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

describe('Votes Controller', () => {
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

  it('should return \'Recipe upvoted\' if upvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/upvote')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.recipe).to.be.an('object');
        expect(res.body.recipe.message).to.equal('Recipe upvoted');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return \'Recipe downvoted\' if downvote is successful', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/downvote')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.recipe).to.be.an('object');
        expect(res.body.recipe.message).to.equal('Recipe downvoted');
        expect(res).to.have.status(201);
        done();
      });
  });
});
