const users = require("../controllers/user.controller");
const router = require("express").Router();
const authorize = require('../middleware/authorize');

module.exports = app => {
    router.post('/authenticate', users.authenticateSchema, users.authenticate);
    router.post('/register', users.registerSchema, users.register);
    router.get('/', authorize(), users.getAll);
    router.get('/current', authorize(), users.getCurrent);
    router.get('/:id', authorize(), users.getById);
    router.put('/:id', authorize(true), users.updateSchema, users.update);
    router.delete('/:id', authorize(true), users._delete);

    app.use('/api/users', router);
};