<p align="left">
    <img src="https://fuchodeveloper.github.io/assets/images/logo.png" alt='more recipes logo'/>
</p>

[![Build Status](https://travis-ci.org/fuchodeveloper/more-recipes.svg?branch=develop)](https://travis-ci.org/fuchodeveloper/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/fuchodeveloper/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/fuchodeveloper/more-recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d85f917ceb5a18c031ea/maintainability)](https://codeclimate.com/github/fuchodeveloper/more-recipes/maintainability)


# More-recipes 
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

More-recipes App: <a href="https://more-recipes-application.herokuapp.com">here</a>

## How it works 
* Users can view various recipes on the application by visiting the app homepage page
* Users can add recipes to the app, but first the user needs to create a new account or sign in
* Authenticated users can do the following on the app:
    * Add a recipe
    * View or modify the recipe he/she added
    * Delete the recipe he/she added
    * Retrieve recipes from the catalog
    * Modify a recipe in the catalog, including upvoting, downvoting, favoriting
    * Delete a recipe from the catalog
    * Retrieve favorited recipes from the catalog
    * Add a review to a recipe
    * Retrieve recipes with the most upvotes
    * Search for recipes
    

## Technologies used

#### Core Technology Stacks

* Front-end: React/Redux + SASS/Bootstrap
* Back-end: Expressjs + Sequelize
* Libraries: jsonwebtoken, Babel, eslint, Mocha/Chai + chai-http, jest, enzyme
* System Dependencies: Node + PostgreSQL

### Folder Structure

* client: contains React/Redux implementation of the frontend
* server: contains the project API created using Node/express + Sequelize/postgreSQL, and tests
* template: contains the UI design with HTML/CSS/BOOTSTRAP

### Getting Started

* Clone project repo - git clone `https://github.com/fuchodeveloper/more-recipes.git`
* Ensure you have installed [NodeJS](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/download/)
* Navigate into the application root directory: `cd more-recipes`
* Setup PostgresSQL on your local machine or Use [ElephantSql](https://www.elephantsql.com/)
* Run `$ npm install` to install all dependencies
* Install sequelize-cli, Run `$ npm install -g sequelize-cli` (NB: May require sudo priviledges)
* Create a `.env` file in the root directory using the sample `.env.sample` file
* setup your database configurations according to settings in server/config/config.js
* Run `$ sequelize db:migrate`
* Run tests using `$ npm run test:dev`

### How to Demo/Run the App

* To start the app in development, run: `npm run start:dev`
* To start the app in a production environment, run: `npm start`


<h3>API Endpoints</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Login to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Create a new recipe</td>
  </tr>  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:id</td>
      <td>Delete a recipe you created</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:id</td>
      <td>Modify Recipe information</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:id/reviews </td>
      <td>Post a review</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/downvote</td>
      <td>Downvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Favorite a recipe</td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Get all your favorite recipes</td>
  </tr>
    <tr>
      <td>GET</td>
      <td>/api/recipes/:id</td>
      <td>Get a recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes</td>
      <td>Get all recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes?sort=upvotes&order=des</td>
      <td>Gets recipe with most Upvotes</td>
  </tr>
</table>
<br/>
More recipes API documentation - <a href="https://more-recipes-application.herokuapp.com/api-docs">here</a>

## Contributing

This project is open for contributions. All contributions must adhere to the Airbnb styleguide.

* [Javascript](http://airbnb.io/javascript/)
* [React](https://github.com/airbnb/javascript/tree/master/react)


### Wiki
Visit the [wiki here](https://github.com/fuchodeveloper/more-recipes/wiki) for more information about the conventions used in this project

### To get started:

* Raise an Issue [here](https://github.com/fuchodeveloper/more-recipes/issues)
* Fork the repository
* Create a branch the feature: `git checkout -b my-new-feature`
* Add your changes `git add .`
* Commit your changes: `git commit -m 'Added some features'`
* Push to the branch: `git push origin my-new-feature`
* Submit a PR (pull request) to the [develop branch](https://github.com/fuchodeveloper/more-recipes)

### License
* [MIT License](https://github.com/fuchodeveloper/more-recipes/blob/develop/LICENSE)

### Author(s)

* [Fredrick Mgbeoma](https://github.com/fuchodeveloper)