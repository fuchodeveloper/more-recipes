import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import testData from './helper/testData';
import app from '../index';

chai.use(chaiHttp);
let userToken, recipe;

describe('User authentication', () => {
  it('should return 201 if user is created', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Content-Type', 'application/json')
      .send(testData.anotherNewUser)
      .end((err, res) => {
        userToken = res.body.token;
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('Recipe controller', () => {
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

  it('should return 401 if creating recipe fails due to token', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', 'ejhs54nsofskalhdfkgnasflgnklsf;ag sfgjoE9EUR0Q3NFKSNDSI')
      .send(testData.newRecipe)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return 200 if all recipes are retrieved', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 200 if a recipe is retrieved', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipe}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 400 if get recipe fails', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipe}dsadgfdgfdgfdgf`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 404 if recipe is not found', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/9999999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 404 if recipe to be deleted is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/999999')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  /**  Recipe Update  ** */

  it('should return 404 if recipe to be updated is not found', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/99999999')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 204 if recipe is updated successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipe}`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send({
        recipeName: faker.name.findName(),
        ingredient: 'new lorem, ipsum, itsum, gallum',
        recipeDirection: 'This is the updated sample recipe description',
        recipeImage: 'http://www/allnigeriafoods.com/sample-recipe-url'
      })
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('should return 400 if recipe update is not successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipe}`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send({
        recipeName: faker.name.findName(),
        wrongIngredientName: 'new lorem, ipsum, itsum, gallum',
        recipeDirection: 'This is the updated sample recipe description',
        recipeImage: 'http://www/allnigeriafoods.com/sample-recipe-url'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 200 if recipe sort in descending order by upvote is successful', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/?sort=upvotes&order=desc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // it('should return 400 if recipe sort in descending order by upvote is not successful', (done) => {
  //   chai.request(app)
  //     .get('/api/v1/recipes/?sort=wrongUpvotes&order=wrongOrder')
  //     .end((err, res) => {
  //       expect(res).to.have.status(500);
  //       done();
  //     });
  // });

  /** Delete recipe */

  it('should return 200 if recipe is successfully deleted', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${recipe}`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
// it('should return 400 if user already exists', (done) => {
//   chai.request(app)
//     .post('/api/v1/users/signup')
//     .set('Content-Type', 'application/json')
//     .send(testData.newUser)
//     .end((err, res) => {
//       expect(res).to.have.status(400);
//       done();
//     });
// });

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
