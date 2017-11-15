import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET_TOKEN;
const { User } = db;

const authourization = {
  /**
   * Verify authenticated user id supplied in token
   *
   * @param {any} req - HTTP Request
   * @param {any} res - HTTP Response
   * @param {any} next
   * @return {object} object
   */
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ error: error.message });
        }
        User.findById(decoded.id)
          .then((user) => {
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(404).json({ error: err.message }));
      });
    } else {
      res.status(403).json({
        error: 'Token not provided'
      });
    }
  },

  /**
   * Verify user based on token
   *
   * @param {any} req - HTTP Request
   * @param {any} res - HTTP Response
   * @param {any} next
   * @returns {object} object
   */
  verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .json({ error: 'No token provided.' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: error.message });
      }
      req.decoded = decoded;
      return next();
    });
  }
};

export default authourization;
