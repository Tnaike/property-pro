/* eslint-disable */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/index';

const request = supertest(app);
const url = '/api/v1';
const user = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'joe@abc.com',
  password: '123456',
  confirm_password: '123456',
  phone_number: '12345678902',
  address: '1 John close'
};
const authenticatedUser = {
  email: user.email,
  password: user.password
};
describe('AuthController', () => {
  describe('signup', () => {
    it('should not sign up with invalid email', done => {
      request
        .post(`${url}/auth/signup`)
        .send({ ...user, email: 'Invalid email' })
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message.email).to.deep.equal(['Email is not a valid email']);
          done();
        });
    });

    it('should not register with different password', done => {
      request
        .post(`${url}/auth/signup`)
        .send({ ...user, confirm_password: 'Invalid password' })
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message.confirm_password).to.deep.equal([
            'Confirm password is not the same as password'
          ]);
          done();
        });
    });

    it('should register a new user', done => {
      request
        .post(`${url}/auth/signup`)
        .send({ ...user })
        .end((err, res) => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.token).to.not.be.undefined;
          done();
        });
    });

    it('should not register a new user that already exist', done => {
      request
        .post(`${url}/auth/signup`)
        .send({ ...user })
        .end((err, res) => {
          const { status, message } = res.body;
          expect(status).to.equal('error');
          expect(message).to.equal('Email address has already been registered');
          done();
        });
    });
  });

  describe('signin', () => {
    it('should not sign in with invalid email', done => {
      request
        .post(`${url}/auth/signin`)
        .send({ ...authenticatedUser, email: 'Invalid email' })
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message).to.equal('Invalid email address or password');
          done();
        });
    });

    it('should not sign in with invalid password', done => {
      request
        .post(`${url}/auth/signin`)
        .send({ ...authenticatedUser, password: 'dejlk33r2lkfwd' })
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message).to.equal('Invalid email address or password');
          done();
        });
    });

    it('should not sign in without email and password', done => {
      request
        .post(`${url}/auth/signin`)
        .send({})
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message).to.equal('Invalid email address or password');
          done();
        });
    });

    it('should sign in with correct sign credentials', done => {
      request
        .post(`${url}/auth/signin`)
        .send({ ...authenticatedUser })
        .end((err, res) => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.token).to.not.be.undefined;
          done();
        });
    });
  });
});
