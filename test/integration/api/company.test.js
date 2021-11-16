const expect = require('chai').expect;
const { app, server } = require('../../../server');
const request = require('supertest');

describe('Company CRUD API', () => {
  const newCompany = {
    "name": "Immersive VR",
    "email": "hr@immersive.com",
    "phone": "123456",
    "website": "immersive.com"
  };

  const updatedCompany = {
    "name": "Immersive VR",
    "email": "hr@immersive.com updated",
    "phone": "123456",
    "website": "immersive.com"
  }
  let newCompanyIdCreated;

  describe('#POST /companies', function () {
    it('should create a company', function (done) {
      request(app).post('/api/companies')
        .send(newCompany)
        .end((err, res) => {
          if (err) done.fail();
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          const { id, name, email, phone, website } = res.body
          expect(name).to.equals(newCompany.name);
          expect(email).to.equals(newCompany.email);
          expect(phone).to.equals(newCompany.phone);
          expect(website).to.equals(newCompany.website);
          newCompanyIdCreated = id;
          done();
        });
    });

    it('should get newly created company', function (done) {
      request(app).get(`/api/companies/${newCompanyIdCreated}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          const { id, name, email, phone, website } = res.body;
          expect(id).to.equals(newCompanyIdCreated);
          expect(name).to.equals(newCompany.name);
          expect(email).to.equals(newCompany.email);
          expect(phone).to.equals(newCompany.phone);
          expect(website).to.equals(newCompany.website);
          done();
        });
    });
  });

  describe('#GET /companies', function () {
    it('should get all companies', function (done) {
      request(app).get('/api/companies')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe('#PUT /companies', function () {
    it('should update a company', function (done) {
      request(app).put(`/api/companies/${newCompanyIdCreated}`)
        .send(updatedCompany)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equals('Company was updated successfully.');
          done();
        });
    });
  });

  describe('#DELETE /companies', function () {
    it('should delete a company', function (done) {
      request(app).delete(`/api/companies/${newCompanyIdCreated}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equals('Company was deleted successfully!');
          done();
        });
    });
  });
});