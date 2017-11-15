import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';

chai.use(chaiHttp);

describe('Tests for more-recipes API endpoints', () => {
  describe('Handle all required endpoints', () => {
    describe('About page', () => {
      it('should return true if "About" page does not exist', () => {
        chai.request('/api/v1/about', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });

      it('should return true if "Contact" page does not exist', () => {
        chai.request('/api/v1/contact', (error, response) => {
          expect(response.statusCode).to.equal(404);
        });
      });
    });
  });
});
