/* eslint-disable */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/index';

const request = supertest(app);
const url = '/api/v1';
const user = {
  email: 'joe@abc.com',
  password: '123456'
};
const property = {
  title: '3 Bedroom Flat',
  price: 700000,
  state: 16,
  city: 'Ikeja',
  address: '101, Toyin street',
  type: 'Apartment',
  image_url: 'http://cloudinary.com/sdfsofsfsjfslkfs',
  description: 'An exquisite 3 bedroom flat with ensuit',
  bathroom: 3,
  bedroom: 2
};
let token = '';

describe('PropertyController', () => {
  before(done => {
    request
      .post(`${url}/auth/signin`)
      .send({ ...user })
      .end((err, res) => {
        const { status, data } = res.body;
        token = data.token;
        done();
      });
  });

  describe('create', () => {
    it('should not create property for invalid user', done => {
      request
        .post(`${url}/property`)
        .send({ ...property })
        .end((err, res) => {
          const { status, message } = res.body;
          console.log(res.body);
          expect(status).to.equal('error');
          expect(message).to.equal('Owner does not exist');
          done();
        });
    });

    it('should create property', done => {
      request
        .post(`${url}/property`)
        .set('x-access-token', token)
        .send({ ...property })
        .end((err, res) => {
          const { status, data } = res.body;

          expect(status).to.equal('success');
          expect(data.id).to.equal(1);
          done();
        });
    });
  });

  describe('edit', () => {
    it('should not edit property for invalid user', done => {
      request
        .patch(`${url}/property/1`)
        .send({ ...property, price: 2000000 })
        .end((err, res) => {
          const { status, message } = res.body;
          expect(status).to.equal('error');
          expect(message).to.equal('Owner does not exist');
          done();
        });
    });

    it('should edit property with valid user', done => {
      request
        .patch(`${url}/property/1`)
        .set('x-access-token', token)
        .send({ ...property, title: '4 Bedroom Flat' })
        .end((err, res) => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.property.title).to.equal('4 Bedroom Flat');
          done();
        });
    });
  });

  describe('sold', () => {
    it('should not mark as sold property for invalid user', done => {
      request
        .patch(`${url}/property/1/sold`)
        .send({ ...property, price: 2000000 })
        .end((err, res) => {
          const { status, message } = res.body;

          expect(status).to.equal('error');
          expect(message).to.equal('Owner does not exist');
          done();
        });
    });

    it('should mark as sold property with valid user', done => {
      request
        .patch(`${url}/property/1/sold`)
        .set('x-access-token', token)
        .end((err, res) => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          console.log(data.property);
          expect(data.property.status).to.equal(0);
          done();
        });
    });
  });
});
