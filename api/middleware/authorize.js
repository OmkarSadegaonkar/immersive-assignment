const jwt = require('express-jwt');
const { secret } = require('../config/config.json');
const db = require("../models");

module.exports = authorize;

function authorize(admin = false) {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await db.user.findByPk(req.user.sub);

            // check user still exists
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });
            // check if admin required
            if (admin && user.role !== 'admin') {
                return res.status(401).json({ message: 'Admin access only' });
            }
            // authorization successful
            req.user = user.get();
            next();
        }
    ];
}
