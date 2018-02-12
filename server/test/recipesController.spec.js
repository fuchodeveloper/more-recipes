import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mock from './helper/mock';
import app from '../index';
import db from '../models';

chai.use(chaiHttp);

const { Recipes } = db;

let userToken, recipeId;

const doBeforeAll = () => {
  before((done) => {
    Recipes.destroy({
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

describe('Recipe controller', () => {
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

  it('should error message if create recipe validation fails', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send(mock.newRecipeValidationFail)
      .end((err, res) => {
        expect(res.body.error.name).to
          .equal('Name must be greater than 3 characters');
        expect(res.body.error.ingredients).to
          .equal('Ingredients must be greater than 6 characters');
        expect(res.body.error.direction).to
          .equal('Direction is too short');
        expect(res).to.have.status(400);
        done();
      });
  });

  it(`should return recipe name if user creates recipe
  successfully`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send(mock.newRecipe)
        .end((err, res) => {
          recipeId = res.body.recipe.id;
          expect(res.body.recipe.name).to.equal('jollof rice');
          expect(res).to.have.status(201);
          done();
        });
    });

  it(`should return an array of recipes if all recipes 
  are retrieved successfully`, (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.body.recipes).to.be.an('array');
          expect(res).to.have.status(200);
          done();
        });
    });

  it('should return 400 and error message if recipe id is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/isudfuis')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.error).to.equal('Recipe id is invalid!');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 404 and error message if recipe is not found', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/99999')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.error).to.equal('Recipe not found');
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 if a recipe is retrieved', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${recipeId}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.recipe.name).to.equal('jollof rice');
        expect(res.body.recipe.ingredients).to
          .equal('lorem, ipsum, itsum, gallum');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return array of recipes created by authenticated user', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/userRecipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.recipes).to.be.an('array');
        expect(res).to.have.status(200);
        done();
      });
  });

  it(`should return 404 and error message if 
  recipe to be deleted is not found`, (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/999999')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('Recipe not found');
          expect(res).to.have.status(404);
          done();
        });
    });

  it(`should return 404 and error message if 
  recipe to be updated is not found`, (done) => {
      chai.request(app)
        .put('/api/v1/recipes/999999')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send(mock.newRecipe)
        .end((err, res) => {
          expect(res.body.message).to.equal('Recipe not found.');
          expect(res).to.have.status(404);
          done();
        });
    });

  it(`should return 'internal server error' 
  if wrong recipe ingredient name is supplied`, (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          name: 'sushi',
          wrongIngredientNameVariable: 'new lorem, ipsum, itsum, gallum',
          direction: `This is a sample recipe description. 
        If you parboiled the rice as described at
        parboiling rice for cooking jollof rice,
         the rice should be done by the time the water is dry. 
         Taste to confirm. If not, you will need to add more water and 
         educe the heat to prevent burning. Keep cooking till done.`,
          image: 'http://www/allnigeriafoods.com/sample-recipe-url'
        })
        .end((err, res) => {
          expect(err.message).to.equal('Internal Server Error');
          expect(res).to.have.status(500);
          done();
        });
    });

  it('should return 200 if recipe is updated successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send({
        name: 'sushi',
        ingredients: 'updated lorem, ipsum, itsum, gallum',
        direction: `This is a sample recipe description. 
        If you parboiled the rice as described at
        parboiling rice for cooking jollof rice,
         the rice should be done by the time the water is dry. 
         Taste to confirm. If not, you will need to add more water and 
         educe the heat to prevent burning. Keep cooking till done.`,
        image: 'http://www/allnigeriafoods.com/sample-recipe-url'
      })
      .end((err, res) => {
        expect(res.body.message).to.equal('Recipe updated');
        expect(res).to.have.status(200);
        done();
      });
  });


  it(`should return 200 if recipe sort in descending
  order by upvote is successful`, (done) => {
      chai.request(app)
        .get('/api/v1/recipes/?sort=upvotes&order=desc')
        .end((err, res) => {
          expect(res.body.recipes).to.be.an('array');
          expect(res).to.have.status(200);
          done();
        });
    });

  /** Delete recipe */

  it(`should return 401 if deleting 
  recipe failed due to Invalid credentials`, (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .set('x-access-token', 'wrongUserToken')
        .end((err, res) => {
          expect(res.body.error).to.equal('Invalid credentials');
          expect(res).to.have.status(401);
          done();
        });
    });
});

