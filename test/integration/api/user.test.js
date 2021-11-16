const expect = require('chai').expect;
const { app, server } = require('../../../server');
const request = require('supertest');
const { newUser, newUserAdmin, newUserBad } = require('../../fixtures/mock-data');

describe('User API CRUD', () => {
    
    describe('#POST /register', function () {
        it('should register a normal user', function (done) {
            request(app).post('/api/users/register')
                .send(newUser)
                .end((err, res) => {
                    if (err) done.fail();
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('should register an admin user', function (done) {
            request(app).post('/api/users/register')
                .send(newUserAdmin)
                .end((err, res) => {
                    if (err) done.fail();
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('should not register an user if password length is less than 6', function (done) {
            request(app).post('/api/users/register')
                .send(newUserBad)
                .end((err, res) => {
                    if (err) done.fail();
                    expect(res.statusCode).to.not.equal(200);
                    done();
                });
        });

        it('should not register an user if with existing username', function (done) {
            request(app).post('/api/users/register')
                .send(newUser)
                .end((err, res) => {
                    if (err) done.fail();
                    expect(res.statusCode).to.not.equal(200);
                    done();
                });
        });
    });

    describe('#POST /authenticate', function () {
        it('should authenticate a normal user', function (done) {
            request(app).post('/api/users/authenticate')
                .send({ username: newUser.username, password: newUser.password })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    const { firstname, lastname, username, token } = res.body;
                    expect(firstname).to.equals(newUser.firstname);
                    expect(lastname).to.equals(newUser.lastname);
                    expect(username).to.equals(newUser.username);
                    newUser.token = token;
                    done();
                });
        });

        it('should authenticate an admin user', function (done) {
            request(app).post('/api/users/authenticate')
                .send({ username: newUserAdmin.username, password: newUserAdmin.password })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    const { firstname, lastname, username, token } = res.body;
                    expect(firstname).to.equals(newUserAdmin.firstname);
                    expect(lastname).to.equals(newUserAdmin.lastname);
                    expect(username).to.equals(newUserAdmin.username);
                    newUserAdmin.token = token;
                    done();
                });
        });
    });

    describe('#GET /users', function () {
        it('should get all users only when authentication provided', function (done) {
            request(app).get('/api/users')
                .set('Authorization', `Bearer ${newUser.token}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    newUser.id = res.body.find(user => user.username === newUser.username).id;
                    newUserAdmin.id = res.body.find(user => user.username === newUserAdmin.username).id;
                    done();
                });
        });
    });

    describe('#DELETE /users', function () {
        it('should block non admin users to delete an user by id', function (done) {
            request(app).delete(`/api/users/${newUser.id}`)
                .set('Authorization', `Bearer ${newUser.token}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    done();
                });
        });

        it('should allow admin user to delete an user by id', function (done) {
            request(app).delete(`/api/users/${newUser.id}`)
                .set('Authorization', `Bearer ${newUserAdmin.token}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
        it('should delete admin user by him/herself', function (done) {
            request(app).delete(`/api/users/${newUserAdmin.id}`)
                .set('Authorization', `Bearer ${newUserAdmin.token}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
});