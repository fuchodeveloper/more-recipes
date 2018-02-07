import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import db from '../models/';
import validateInput from '../validations/validateInput';
import validateLoginInput from '../validations/validateLoginInput';

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

    const { errors, isValid } = validateInput(body);
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
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} user
   */
  login(request, response) {
    const { body } = request;

    const { errors, isValid } = validateLoginInput(body);
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
            error: 'Authentication failed. No user found.'
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
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user
   */
  getUser(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['firstName', 'lastName', 'emailAddress']
    })
      .then(user => res.status(200).json({ user }))
      .catch(error => res.status(404).json({ error }));
  },

  updateUser(req, res) {
    const { body } = req;

    const isNotValid = () => {
      const { errors, isValid } = validateInput(body);
      if (!isValid) {
        return errors;
      }
    };

    if (isNotValid()) {
      return res.status(400).json({ errors: isNotValid() });
    }

    const { firstName } = req.body;
    const { lastName } = req.body;
    const { emailAddress } = req.body;

    return User.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'No user found.' });
        }

        return user.update({
          firstName: firstName ? firstName.trim() : user.firstName,
          lastName: lastName ? lastName.trim() : user.lastName,
          emailAddress: emailAddress ? emailAddress.trim() : user.emailAddress,
        }, { where: { id: req.decoded.id } })
          .then((userData) => {
            User.findOne({
              where: {
                id: userData.id
              },
              attributes: ['firstName', 'lastName', 'emailAddress']
            })
              .then(updatedUser => res.status(200).json({ user: updatedUser }));
          });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }
};

export default UsersController;
