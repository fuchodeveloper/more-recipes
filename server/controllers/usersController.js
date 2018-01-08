import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import _ from 'lodash';
import db from '../models/';
import validateInput from '../validations/validateInput';

const { User } = db;

dotenv.config();
const secret = process.env.SECRET_TOKEN;

const usersController = {
  /**
    * Controller to create a new user
   *
   * @param {any} request - The incoming request
   * @param {any} response - The response
   * @returns {object} User - Returned user object
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
          return response.status(400)
            .json({ error: 'User already exists. Try again.' });
        }
        const hashedPassword = bcrypt.hashSync((request.body.password));
        User.create({
          firstName: request.body.firstName.trim(),
          lastName: request.body.lastName.trim(),
          emailAddress: request.body.emailAddress.trim(),
          password: hashedPassword
        })
          .then((savedUser) => {
            const userDetails = _.pick(savedUser, ['id', 'firstName', 'lastName', 'emailAddress']);
            const authToken = jwt.sign(userDetails, secret, { expiresIn: 86400 });
            response.status(201).json({ user: userDetails, token: authToken });
          })
          .catch(error => response.status(400)
            .json({ error: error.message }));
      }).catch(() => response.status(500)
        .json({ error: 'There was a problem registering the user.' }));
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
        emailAddress: request.body.emailAddress.trim()
      }
    })
      .then((user) => {
        if (!user) {
          return response.status(404).json({ error: 'Authentication failed. No user found.' });
        }
        if (user) {
          const confirmPassword =
          bcrypt.compareSync((request.body.password), user.password);
          if (confirmPassword === false) {
            return response.status(401).json({ error: 'Authentication failed. Wrong password.' });
          }
        }

        const userDetails = _.pick(user, ['id', 'firstName', 'lastName', 'emailAddress']);
        const myToken = jwt.sign(userDetails, secret, { expiresIn: 86400 });
        const decoded = jwt.verify(myToken, secret);
        return response.status(200).send({ message: 'Log in successful', user: decoded, token: myToken, });
      })
      .catch(error => response.status(500).json({ error: error.message }));
  },

  /**
   * Get the user with the id specified in the param
   *
   * @param {any} req
   * @param {any} res
   * @returns {object} object
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
      return res.json({ errors: isNotValid() });
    }

    const { firstName } = req.body;
    const { lastName } = req.body;
    const { emailAddress } = req.body;
    const { password } = req.body;
    const { newPassword } = req.body;

    return User.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'No user found.' });
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (comparePassword === false) {
          return res.status(401).json({ error: 'Incorrect old password' });
        }

        const newUpdatedPassword = bcrypt.hashSync(newPassword);

        return user.update({
          firstName: firstName ? firstName.trim() : user.firstName,
          lastName: lastName ? lastName.trim() : user.lastName,
          emailAddress: emailAddress ? emailAddress.trim() : user.emailAddress,
          password: newUpdatedPassword
        }, { where: { id: req.decoded.id } })
          .then((userData) => {
            User.findOne({
              where: {
                id: userData.id
              },
              attributes: ['firstName', 'lastName', 'emailAddress']
            })
              .then(updatedUser => res.status(200).json({ user: updatedUser }))
              .catch(error => res.status(404).json({ error: error.message }));
          })
          .catch(error => res.status(400)
            .json({ error: error.message }));
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }
};

export default usersController;
