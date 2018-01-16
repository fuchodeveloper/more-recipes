import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testData from './helper/testData';
import app from '../index';

chai.use(chaiHttp);


describe('User authentication', () => {
  it('should return 201 if user is created', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(testData.newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 400 if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(testData.newUser)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return 200 if user sign in is successful', (done) => {
    const user = {
      emailAddress: testData.newUser.emailAddress,
      password: 'password'
    };

    chai.request(app)
      .post('/api/v1/users/signin')
      .set('Content-Type', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });


  it(`should return 404 if user attempting to sign in
   does not exist`, (done) => {
      const user = {
        emailAddress: 'userdoesnotexist@domain.com',
        password: 'password'
      };

      chai.request(app)
        .post('/api/v1/users/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  it('should return 401 if user attempts using wrong password', (done) => {
    const user = {
      emailAddress: testData.newUser.emailAddress,
      password: 'passworddddddd'
    };

    chai.request(app)
      .post('/api/v1/users/signin')
      .set('Content-Type', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });


  // it('should return true if user is created', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/users/signup')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       firstName: 'harley',
  //       lastName: 'davidson',
  //       emailAddress: 'harley@gmail.com',
  //       password: 'password',
  //       password_confirmation: 'password'
  //     })
  //     .end((err, res) => {
  //       // expect(err).to.be.null;
  //       expect(res).to.have.status(400);
  //       done();
  //     });
  // });
});
