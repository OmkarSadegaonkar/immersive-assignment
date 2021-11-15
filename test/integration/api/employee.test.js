const expect = require('chai').expect;
const { app, server } = require('../../../server');
const request = require('supertest');

describe('Employee CRUD API', () => {
  const newEmployee = {
    "firstname": "Joe",
    "lastname": "Smith",
    "email": "joesmith@immersive.com",
    "phone": "123456",
    "company": "immersive.com"
  };

  const updatedEmployee = {
    "firstname": "Joe updated",
    "lastname": "Smith",
    "email": "joesmith@immersive.com",
    "phone": "123456",
    "company": "immersive.com"
  }
  let newEmployeeIdCreated;

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
});