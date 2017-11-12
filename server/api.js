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
*       email:
*         type: string
*         format: email
*       password:
*         type: string
*         format: password
*     example:
*       email: example@example.com
*       password: password
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
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Log in successful
*/
