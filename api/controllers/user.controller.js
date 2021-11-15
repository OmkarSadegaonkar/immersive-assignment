const express = require('express');
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const userService = require('../services/user.service');


exports.authenticateSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports.registerSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

exports.register = (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

exports.getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

exports.getCurrent = (req, res, next) => {
    res.json(req.user);
}

exports.getById = (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

exports.update = (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports._delete = (req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}