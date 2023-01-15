const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const demandeChequierService = require('./demande-chequier.service');

// routes
router.post('/add', registerSchema, register);
router.get('/:id', getAll);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        rib: Joi.string().required(),
        idUser: Joi.string().required(),
        nbCheck: Joi.string().required(),
        barre: Joi.string().required(),
        etat: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    demandeChequierService.create(req.body)
        .then(() => res.json({ message: 'Demande de chequier envoyée' }))
        .catch(next);
}

function getAll(req, res, next) {
    demandeChequierService.getAll(req.params.id)
        .then(demandesChequier => res.json(demandesChequier))
        .catch(next);
}

