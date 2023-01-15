const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const accountService = require('./account.service');

// routes
// router.post('/authenticate', authenticateSchema, authenticate);
router.post('/add', registerSchema, register);
router.get('/:id', getAll);
router.post('/transfer', transferSchema, transfer);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);

module.exports = router;

// function authenticateSchema(req, res, next) {
//     const schema = Joi.object({
//         username: Joi.string().required(),
//         password: Joi.string().required()
//     });
//     validateRequest(req, next, schema);
// }

// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

function registerSchema(req, res, next) {
    const schema = Joi.object({
        rib: Joi.string().required(),
        idUser: Joi.string().required(),
        type: Joi.string().required(),
        gest: Joi.string().required(),
        solde: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    accountService.create(req.body)
        .then(() => res.json({ message: 'Compte créé' }))
        .catch(next);
}

function getAll(req, res, next) {
    accountService.getAll(req.params.id)
        .then(accounts => res.json(accounts))
        .catch(next);
}

function transferSchema(req, res, next) {
    const schema = Joi.object({
        ribFrom: Joi.string().required(),
        ribTo: Joi.string().required(),
        montant: Joi.string().required(),
        idUser: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function transfer(req, res, next) {
    accountService.transfer(req.body)
        .then(() => res.json({ message: 'Transfer effectué' }))
        .catch(next);
}

// function getCurrent(req, res, next) {
//     res.json(req.user);
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({ message: 'User deleted successfully' }))
//         .catch(next);
// }