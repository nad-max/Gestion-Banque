const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const demandeCarteService = require('./demande-carte.service');

// routes
router.post('/add', registerSchema, register);
router.get('/:id', getAll);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        rib: Joi.string().required(),
        idUser: Joi.string().required(),
        type: Joi.string().required(),
        etat: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    demandeCarteService.create(req.body)
        .then(() => res.json({ message: 'Demande de carte '+req.body.type+' envoyée' }))
        .catch(next);
}

function getAll(req, res, next) {
    demandeCarteService.getAll(req.params.id)
        .then(demandesCarte => res.json(demandesCarte))
        .catch(next);
}

