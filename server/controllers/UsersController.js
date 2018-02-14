import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import db from '../models/';
import validateSignup from '../validations/validateSignup';
import validateLogin from '../validations/validateLogin';

const { User } = db;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const UsersController = {
  /**
    * @description Controller to create a new user
   *
   * @param {Object} request - The incoming request
   * @param {Object} response - The response
   *
   * @returns {Object} User - Returned user object
   */
  create(request, response) {
    const { body } = request;

    const { errors, isValid } = validateSignup(body);
    if (!isValid) {
      return response.status(400).json({ error: errors });
    }


    User.findOne({ where: { emailAddress: body.emailAddress } })
      .then((user) => {
        if (user) {
          return response.status(409)
            .json({
              error:
              'User already exists. Try again.'
            });
        }
        const hashedPassword = bcrypt.hashSync((request.body.password));
        User.create({
          firstName: request.body.firstName.trim(),
          lastName: request.body.lastName.trim(),
          emailAddress: request.body.emailAddress.trim(),
          password: hashedPassword
        })
          .then((savedUser) => {
            const userDetails = pick(
              savedUser,
              ['id', 'firstName', 'lastName', 'emailAddress']
            );
            const authToken = jwt.sign(
              userDetails, secret,
              { expiresIn: 86400 }
            );
            response.status(201).json({
              message: 'Signup successful',
              token: authToken
            });
          });
      }).catch(() => response.status(500)
        .json({ error: 'There was a problem registering the user.' }));
  },

  /**
   * @description Controller to log in an existing user
   *
   * @param {Object} request login request
   * @param {Object} response login response
   *
   * @returns {Object} authenticated user object
   */
  login(request, response) {
    const { body } = request;

    const { errors, isValid } = validateLogin(body);
    if (!isValid) {
      return response.status(400).json({ error: errors });
    }

    User.findOne({
      where: {
        emailAddress: request.body.emailAddress
      }
    })
      .then((user) => {
        if (!user) {
          return response.status(404).json({
            error: 'Wrong email or password'
          });
        }
        if (user) {
          const confirmPassword =
          bcrypt.compareSync((request.body.password), user.password);
          if (confirmPassword === false) {
            return response.status(401)
              .json({ error: 'Wrong email or password' });
          }
        }

        const userDetails = pick(
          user,
          ['id', 'firstName', 'lastName', 'emailAddress']
        );
        const myToken = jwt.sign(userDetails, secret, { expiresIn: 86400 });
        return response.status(200).send({
          message: 'Log in successful',
          token: myToken,
        });
      })
      .catch(() => response.status(500).json({
        error: 'An unexpected error occurred'
      }));
  },

  /**
   * @description Get the user with the id specified in the param
   *
   * @param {Object} req get user request
   * @param {Object} res get user response
   *
   * @returns {Object} returns user object
   */
  getUser(req, res) {
    const userProfileDetails = req.user;
    return res.status(200).json({ user: userProfileDetails });
  },

  updateUser(req, res) {
    const { body } = req;

    const isNotValid = () => {
      const { errors, isValid } = validateSignup(body);
      if (!isValid) {
        return errors;
      }
    };

    if (isNotValid()) {
      return res.status(400).json({ errors: isNotValid() });
    }

    const {
      firstName,
      lastName,
      emailAddress
    } = req.body;

    const decodedId = req.user.id;
    const decodedFirstName = req.user.firstName;
    const decodedLastName = req.user.lastName;
    const decodedEmailAddress = req.user.emailAddress;

    return User.update({
      firstName: firstName ? firstName : decodedFirstName,
      lastName: lastName ? lastName : decodedLastName,
      emailAddress: emailAddress ? emailAddress : decodedEmailAddress,
    }, { where: { id: decodedId } })
      .then(() => {
        User.findOne({
          where: {
            id: decodedId
          },
          attributes: ['firstName', 'lastName', 'emailAddress']
        })
          .then(updatedUser => res.status(200).json({ user: updatedUser }));
      })
      .catch(() => res.status(500)
        .json({ error: 'An unexpected error occurred' }));
  }
};

export default UsersController;
