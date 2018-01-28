import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../index';
import db from '../models';

chai.use(chaiHttp);

const { Favorites } = db;

let userToken, recipeId;

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

describe('Favorites controller', () => {
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

  it('should return 400 if favorites recipe validation fails', (done) => {
    chai.request(app)
      .post('/api/v1/users/wrong/recipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Recipe id is invalid!');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return new recipe object and id', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send(mock.newRecipe)
      .end((err, res) => {
        recipeId = res.body.recipe.id;
        expect(res.body.recipe).to.be.an('object');
        expect(res.body.recipe.id).to.be.a('number');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 201 if a favorite is successfully created', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${recipeId}/recipes`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.favorite.message).to.equal('Recipe favorited');
        expect(res).to.have.status(201);
        done();
      });
  });
});

