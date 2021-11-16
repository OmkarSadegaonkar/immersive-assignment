const expect = require('chai').expect;
const { app, server } = require('../../../server');
const request = require('supertest');
const { newEmployee, updatedEmployee, newCompany } = require('../../fixtures/mock-data');

describe('Employee CRUD API', () => {
  let newEmployeeIdCreated, newCompanyIdCreated;
  
  it('should create a company first', function (done) {
    request(app).post('/api/companies')
      .send(newCompany)
      .end((err, res) => {
        if (err) done.fail();
        expect(res.statusCode).to.equal(200);
        newCompanyIdCreated = res.body.id;
        done();
      });
  });

  describe('#POST /employees', function () {
    it('should create an employee', function (done) {
      request(app).post('/api/employees')
        .send(newEmployee)
        .end((err, res) => {
          if (err) done.fail();
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          const { id, firstname, lastname, email, phone, company } = res.body
          expect(firstname).to.equals(newEmployee.firstname);
          expect(lastname).to.equals(newEmployee.lastname);
          expect(email).to.equals(newEmployee.email);
          expect(phone).to.equals(newEmployee.phone);
          expect(company).to.equals(newEmployee.company);
          newEmployeeIdCreated = id;
          done();
        });
    });

    it('should get newly created employee', function (done) {
      request(app).get(`/api/employees/${newEmployeeIdCreated}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          const { id, firstname, lastname, email, phone, company } = res.body;
          expect(id).to.equals(newEmployeeIdCreated);
          expect(firstname).to.equals(newEmployee.firstname);
          expect(lastname).to.equals(newEmployee.lastname);
          expect(email).to.equals(newEmployee.email);
          expect(phone).to.equals(newEmployee.phone);
          expect(company).to.equals(newEmployee.company);
          done();
        });
    });
  });

  describe('#GET /employees', function () {
    it('should get all employees', function (done) {
      request(app).get('/api/employees')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe('#PUT /employees', function () {
    it('should update an employee', function (done) {
      request(app).put(`/api/employees/${newEmployeeIdCreated}`)
        .send(updatedEmployee)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equals('Employee was updated successfully.');
          done();
        });
    });
  });

  describe('#DELETE /employees', function () {
    it('should delete a employee', function (done) {
      request(app).delete(`/api/employees/${newEmployeeIdCreated}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equals('Employee was deleted successfully!');
          done();
        });
    });
  });

  
  it('should delete the company at the end', function (done) {
    request(app).delete(`/api/companies/${newCompanyIdCreated}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equals('Company was deleted successfully!');
        done();
      });
  });
});