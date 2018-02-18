/* eslint-disable max-len */
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

  it(
    'should return success message and token if user signin is successful',
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
          userToken = res.body.token;
          expect(res.body.message).to.equal('Log in successful');
          expect(res.body).to.have.property('token');
          expect(res).to.have.status(200);
          done();
        });
    }
  );

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

  it(
    'should return recipe name if user creates recipe successfully',
    (done) => {
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
    }
  );

  it('should allow user view all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.recipes).to.be.an('array');
        expect(res).to.have.status(200);
        expect(res.body.recipes[0].id).to.equal(1);
        expect(res.body.recipes[0].userId).to.equal(1);
        expect(res.body.recipes[0].name).to.equal('jollof rice');
        expect(res.body.recipes[0].favoriteCount).to.equal(0);
        expect(res.body.recipes[0].ingredients).to
          .equal('lorem, ipsum, itsum, gallum');
        expect(res.body.recipes[0].direction).to.equal('this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.');
        expect(res.body.recipes[0].image).to
          .equal('http://www/allnigeriafoods.com/sample-recipe-url');
        expect(res.body.recipes[0].views).to.equal(0);
        expect(res.body.recipes[0].upVotes).to.equal(0);
        expect(res.body.recipes[0].downVotes).to.equal(0);
        expect(res.body.recipes[0].recipeOwnerView).to.equal(false);
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

  it(
    'should return 200 and recipe details of a recipe retrieved',
    (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.body.recipe.id).to.equal(1);
          expect(res.body.recipe.userId).to.equal(1);
          expect(res.body.recipe.name).to.equal('jollof rice');
          expect(res.body.recipe.favoriteCount).to.equal(0);
          expect(res.body.recipe.ingredients).to
            .equal('lorem, ipsum, itsum, gallum');
          expect(res.body.recipe.ingredients).to
            .equal('lorem, ipsum, itsum, gallum');
          expect(res.body.recipe.direction).to.equal('this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.');
          expect(res.body.recipe.image).to
            .equal('http://www/allnigeriafoods.com/sample-recipe-url');
          expect(res.body.recipe.views).to.equal(1);
          expect(res.body.recipe.upVotes).to.equal(0);
          expect(res.body.recipe.downVotes).to.equal(0);
          expect(res.body.recipe.recipeOwnerView).to.equal(false);
          expect(res).to.have.status(200);
          done();
        });
    }
  );

  it('should return recipes created by authenticated user', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/userRecipes')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.body.recipes).to.be.an('array');
        expect(res).to.have.status(200);
        expect(res.body.recipes[0].id).to.equal(1);
        expect(res.body.recipes[0].userId).to.equal(1);
        expect(res.body.recipes[0].name).to.equal('jollof rice');
        expect(res.body.recipes[0].favoriteCount).to.equal(0);
        expect(res.body.recipes[0].ingredients).to
          .equal('lorem, ipsum, itsum, gallum');
        expect(res.body.recipes[0].direction).to.equal('this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.');
        expect(res.body.recipes[0].image).to
          .equal('http://www/allnigeriafoods.com/sample-recipe-url');
        expect(res.body.recipes[0].views).to.equal(1);
        expect(res.body.recipes[0].upVotes).to.equal(0);
        expect(res.body.recipes[0].downVotes).to.equal(0);
        expect(res.body.recipes[0].recipeOwnerView).to.equal(false);
        done();
      });
  });

  it(
    'should return 404 and error message if recipe to be deleted is not found',
    (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/999999')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('Recipe not found');
          expect(res).to.have.status(404);
          done();
        });
    }
  );

  it(
    'should return 404 and error message if recipe to be updated is not found',
    (done) => {
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
    }
  );

  it(
    'should return "internal server error" if wrong recipe ingredient name is supplied for update',
    (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          name: 'sushi',
          wrongIngredientNameVariable: 'new lorem, ipsum, itsum, gallum',
          direction: 'this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.',
          image: 'http://www/allnigeriafoods.com/sample-recipe-url'
        })
        .end((err, res) => {
          expect(err.message).to.equal('Internal Server Error');
          expect(res).to.have.status(500);
          done();
        });
    }
  );

  it(
    'should return 200 and success message if recipe is updated successfully',
    (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .set('x-access-token', userToken)
        .send({
          name: 'sushi',
          ingredients: 'updated lorem, ipsum, itsum, gallum',
          direction: 'this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.',
          image: 'http://www/allnigeriafoods.com/sample-recipe-url'
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Recipe updated');
          expect(res).to.have.status(200);
          done();
        });
    }
  );


  it(
    'should return 200 and recipes if recipe sort in descending order by upvote is successful',
    (done) => {
      chai.request(app)
        .get('/api/v1/recipes/?sort=upvotes&order=desc')
        .end((err, res) => {
          expect(res.body.recipes).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body.recipes[0].id).to.equal(1);
          expect(res.body.recipes[0].userId).to.equal(1);
          expect(res.body.recipes[0].name).to.equal('sushi');
          expect(res.body.recipes[0].favoriteCount).to.equal(0);
          expect(res.body.recipes[0].ingredients).to
            .equal('updated lorem, ipsum, itsum, gallum');
          expect(res.body.recipes[0].direction).to.equal('this is a sample recipe description. if you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. taste to confirm. if not, you will need to add more water and reduce the heat to prevent burning. keep cooking till done.');
          expect(res.body.recipes[0].image).to
            .equal('http://www/allnigeriafoods.com/sample-recipe-url');
          expect(res.body.recipes[0].views).to.equal(1);
          expect(res.body.recipes[0].upVotes).to.equal(0);
          expect(res.body.recipes[0].downVotes).to.equal(0);
          expect(res.body.recipes[0].recipeOwnerView).to.equal(false);
          done();
        });
    }
  );

  /** Delete recipe */

  it(
    'should return 401 and error if deleting recipe failed due to invalid credentials',
    (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .set('Content-Type', 'application/json')
        .set('x-access-token', 'wrongUserToken')
        .end((err, res) => {
          expect(res.body.error).to.equal('Invalid credentials');
          expect(res).to.have.status(401);
          done();
        });
    }
  );
});
