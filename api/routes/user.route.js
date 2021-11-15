const users = require("../controllers/user.controller");
const router = require("express").Router();
const authorize = require('../_middleware/authorize');

module.exports = app => {
    router.post('/authenticate', users.authenticateSchema, users.authenticate);
    router.post('/register', users.registerSchema, users.register);
    router.get('/', authorize(), users.getAll);
    router.get('/current', authorize(), users.getCurrent);
    router.get('/:id', authorize(), users.getById);
    router.put('/:id', authorize(), users.updateSchema, users.update);
    router.delete('/:id', authorize(), users._delete);

    app.use('/api/users', router);
};