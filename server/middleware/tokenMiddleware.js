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
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @return {json} json
   */
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: error.message });
        }
        User.findById(decoded.data.id)
          .then((user) => {
            if (!user) {
              return res.json({ message: error.message });
            }
            req.decoded = decoded.data;
            return next();
          })
          .catch(err => res.status(404).json({ error: err.message }));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  },

  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .send({ auth: false, message: 'No token provided.' });
    }

    // const decodedId = jwt.verify(token, secret);
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: error.message });
      }
      req.decoded = decoded;
      return next();
    });
  }
};
export default authourization;
