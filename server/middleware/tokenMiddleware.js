import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET_TOKEN;
const { User } = db;

const authourization = {
  /**
   * @description Verify authenticated user id supplied in token
   *
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next
   *
   * @return {Function} next
   */
  verifyToken(req, res, next) {
    const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({
        error: 'No token provided'
      });
    }
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        User.findById(decoded.id)
          .then((user) => {
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(500).json({ error: err.message }));
      });
    }
  },

  /**
   * @description Verify user based on token
   *
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next
   *
   * @returns {Function} next
   */
  verifyUser(req, res, next) {
    const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .json({ error: 'No token provided' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      req.decoded = decoded;
      return next();
    });
  },

  injectToken(req, res, next) {
    const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return next();
    }

    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.decoded = decoded;
        return next();
      });
    }
  }
};

export default authourization;
