/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       firstName:
*         type: string
*       lastName:
*         type: string
*       emailAddress:
*         type: string
*         format: email
*       password:
*         type: string
*         format: password
*       password_confirmation:
*         type: string
*         format: password
*     example:
*       firstName: Michael
*       lastName: Jackson
*       emailAddress: michael@gmail.com
*       password: password
*       password_confirmation: password
*/

/**
* @swagger
* definitions:
*   Signin:
*     properties:
*       emailAddress:
*         type: string
*         format: email
*       password:
*         type: string
*         format: password
*     example:
*       emailAddress: michael@gmail.com
*       password: password
*/

/**
* @swagger
* definitions:
*   Recipes:
*     properties:
*       recipeName:
*         type: string
*       ingredient:
*         type: string
*       recipeImage:
*         type: string
*       recipeDirection:
*         type: string
*     example:
*       recipeName: Coconut Fufu
*       ingredient: 2 parts Coconut Flour, 1 part of Garri
*       recipeImage: http://www.allnigerianrecipes.com/images/coconut-fufu.jpg
*       recipeDirection`: "Mix the 2 parts of coconut flour with one part of Garri in bowl.
*       Grind the combo with a dry mill (coffee grinder, spice grinder, blender dry mill etc)
*       to turn the coarse grains of Garri into powder."
*/

/**
* @swagger
* definitions:
*   Favorites:
*     properties:
*       userId:
*         type: integer
*       recipeId:
*         type: integer
*     example:
*       userId: 1
*       recipeId: 1
*/ 



// Register a new User
/**
* @swagger
* /api/v1/users/signup:
*   post:
*     tags:
*       - Users
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Registration
*         description: Enter your details as shown in the example to the right
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signup'
*     responses:
*       201:
*         description: User created
*/

// Sign in a new user
/**
* @swagger
* /api/v1/users/signin:
*   post:
*     tags:
*       - Users
*     description: Sign in a existing user
*     produces:
*       - application/json
*     parameters:
*       - name: Signin
*         description: Click on the example to the right to test user sign in
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Log in successful
*/

/**
* @swagger
*  securityDefinitions:
*    ApiKeyAuth:
*      type: apiKey
*      in: header
*      name: x-access-token
* /api/v1/recipes:
*   post:
*     tags:
*       - Recipes
*     description: Add a new Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: Post Recipe
*         description: Click on the example to the right to try out creating a recipe
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       201:
*         description: Successfully created
*/


/**
* @swagger
* /api/v1/recipes:
*   get:
*     tags:
*       - Recipes
*     description: Returns all available recipes
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Successful
*        
*/
