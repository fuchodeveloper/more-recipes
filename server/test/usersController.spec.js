/* eslint-disable max-len */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../index';
import db from '../models';

chai.use(chaiHttp);

const { User } = db;

let userToken;

const doBeforeAll = () => {
  before((done) => {
    User.destroy({
      force: true,
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

describe('User authentication', () => {
  doBeforeAll();
  doBeforeEach();
  it(
    'should return success message and contain token if user is created',
    (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .set('Content-Type', 'application/json')
        .send(mock.newUser)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.body.message).to.equal('Signup successful');
          expect(res.body).to.have.property('token');
          done();
        });
    }
  );

  it('should return validation error if first name is empty', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(mock.noFirsnameNewUser)
      .end((err, res) => {
        expect(res.body.error.firstName).to
          .equal('First name must be greater than 3 characters');
        expect(res).to.have.status(400);
        done();
      });
  });

  it(
    'should return 404 and error if user attempting to sign in does not exist',
    (done) => {
      const user = {
        emailAddress: 'userdoesnotexist@domain.com',
        password: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body.error).to
            .equal('Wrong email or password');
          expect(res).to.have.status(404);
          done();
        });
    }
  );

  it('should return 409 and error if user email already exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(mock.newUser)
      .end((err, res) => {
        expect(res.body.error).to.equal('User already exists. Try again.');
        expect(res).to.have.status(409);
        done();
      });
  });

  it(
    'should return validation error if signin email address provided is invalid',
    (done) => {
      const user = {
        emailAddress: 'dff@sdfsdf',
        password: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body.error.emailAddress).to.equal('Email is invalid');
          expect(res).to.have.status(400);
          done();
        });
    }
  );

  it(
    'should return success message and contain token if user signin is successful',
    (done) => {
      const user = {
        emailAddress: mock.newUser.emailAddress,
        password: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body.message).to.equal('Log in successful');
          expect(res.body).to.have.property('token');
          expect(res).to.have.status(200);
          done();
        });
    }
  );

  it(
    'should return wrong email or password error if email or password provided is wrong',
    (done) => {
      const user = {
        emailAddress: mock.newUser.emailAddress,
        password: 'passworddddddd'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body.error).to.equal('Wrong email or password');
          expect(res).to.have.status(401);
          done();
        });
    }
  );

  it(
    'should return error if update user profile fails due to validation error',
    (done) => {
      const user = {
        firstName: 'j',
        lastName: 'D',
        emailAddress: 'johndoe007@gmail.com',
        password: 'password',
        passwordConfirmation: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/update')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send(user)
        .end((err, res) => {
          expect(res.body.errors.firstName).to
            .equal('First name must be greater than 3 characters');
          expect(res.body.errors.lastName).to
            .equal('Last name must be greater than 3 characters');
          expect(res).to.have.status(400);
          done();
        });
    }
  );
});
