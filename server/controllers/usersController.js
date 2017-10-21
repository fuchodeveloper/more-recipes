import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import _ from 'lodash';
import db from '../models/';

const { User } = db;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

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
    const rules = {
      firstName: 'required|string',
      lastName: 'required|string',
      emailAddress: 'required|email',
      password: 'required|min:6|alpha_num',
      password_confirmation: 'required|same:password'
    };

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }
    User.findOne({ where: { emailAddress: body.emailAddress } })
      .then((user) => {
        if (user) {
          return response.status(404)
            .json({ message: 'User already exists. Try again.' });
        }
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
      }).catch(() => response.status(400)
        .json({ message: 'There was a problem registering the user.' }));
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
      return response.json({ error: validation.errors.all() });
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
