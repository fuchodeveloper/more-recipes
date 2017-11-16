<p align="center">
    <img src="https://fuchodeveloper.github.io/assets/images/logo.png" alt='more recipes logo'/>
</p>

<p align="center">
    <img src="https://travis-ci.org/fuchodeveloper/more-recipes.svg?branch=master" alt="travis ci build test badge" />
    <a href='https://coveralls.io/github/fuchodeveloper/more-recipes?branch=master'><img src='https://coveralls.io/repos/github/fuchodeveloper/more-recipes/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://codeclimate.com/github/fuchodeveloper/more-recipes"><img src="https://codeclimate.com/github/fuchodeveloper/more-recipes/badges/gpa.svg" /></a>
</p>

## More-recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

More-recipes API: <a href="https://more-recipes-application.herokuapp.com">here</a>

## How it works 
* Users can view various recipes on the application by visiting the app catalog page
* Users can add recipes to the app, but first the user needs to create a new account or sign in
* Authenticated users can do the following on the app:
    * Add a recipe
    * View or modify the recipe he/she added
    * Delete the recipe he/she added
    * Retrieve recipes from the catalog
    * Modify a recipe in the catalog, including upvoting, downvoting, favoriting e.t.c
    * Delete a recipe from the catalog
    * Retrieve favorited recipes from the catalog
    * Add a review for a recipe
    * Retrieve recipes with the most upvotes
    

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: HTML, CSS and JavaScript</li>
  <li>Back-end: NodeJS, Expressjs, Sequelize and Postgresql</li>
</ul>

<h3>Getting Started</h3>
<ul>
    <li>Clone project - git clone https://github.com/fuchodeveloper/more-recipes.git</li>
    <li>Install dependencies - npm install</li>
    <li>Run app - npm run start:dev</li>
</ul>

<h3>API ENDPOINTS</h3>
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