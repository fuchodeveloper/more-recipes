import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import db from '../models/';
import commonValidations from '../../client/components/shared/validations/signup';

const { User } = db;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

/**
 * Validations
 *
 * @param {any} data
 * @param {any} otherValidations
 * @returns {obj} obj
 */
function validateInput(data, otherValidations) {
  const { errors } = otherValidations(data);

  return User.findOne({ where: { emailAddress: data.emailAddress } })
    .then((user) => {
      if (user) {
        if (user.emailAddress === data.emailAddress) {
          errors.emailAddress = 'User already exists. Try again.';
        }
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
}


const usersController = {
  /**
   * Controller to create a new user
   *
   * @param {any} request
   * @param {any} response
   * @returns {obj} User
   */
  create(request, response) {
    const { body } = request;
    /**
     * validate form input
     *
     * @param {any} data
     * @returns {obj} obj
     */

    validateInput(body, commonValidations)
      .then(({ errors, isValid }) => {
        if (!isValid) {
          response.status(400).json(errors);
        }

        // User.findOne({ where: { emailAddress: body.emailAddress } })
        //   .then((user) => {
        //     if (user) {
        //       return response.status(404)
        //         .json({ message: 'User already exists. Try again.' });
        //     }
        const hashedPassword = bcrypt.hashSync((request.body.password).trim());
        User.create({
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          emailAddress: request.body.emailAddress,
          password: hashedPassword
        })
          .then((savedUser) => {
            const data = _.pick(savedUser, ['id', 'firstName', 'lastName', 'emailAddress']);
            const authToken = jwt.sign({ data }, secret, { expiresIn: 86400 });
            response.status(201).json({ auth: true, user: data, token: authToken });
          })
          .catch(error => response.status(400)
            .json({ error: error.message }));
      });
    // .catch(() => {
    //   'There was a problem registering the user.';
    // });
    // });
  },

  /**
   * Controller to log in an existing user
   * @param {any} request
   * @param {any} response
   * @returns {json} user
   */
  login(request, response) {
    const { body } = request;

    const rules = {
      emailAddress: 'required|email',
      password: 'required|min:6|alpha_num'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: 'Check details again.' });
      // return response.json({ error: validation.errors.all() });
    }

    User.findOne({
      where: {
        emailAddress: request.body.emailAddress
      }
    })
      .then((user) => {
        if (!user) {
          return response.status(404).json({ error: 'Authentication failed. No user found.' });
        }
        if (user) {
          const confirmPassword =
          bcrypt.compareSync((request.body.password).trim(), user.password);
          if (confirmPassword === false) {
            response.status(401).json({ error: 'Authentication failed. Wrong password.' });
          }
        }

        const data = _.pick(user, ['id', 'firstName', 'lastName', 'emailAddress']);
        const myToken = jwt.sign(data, secret, { expiresIn: 86400 });
        const decoded = jwt.verify(myToken, secret);
        return response.status(200).send({ message: 'Log in successful', user: decoded, token: myToken, });
      })
      .catch(error => response.send(error.message));
  }
};

export default usersController;
