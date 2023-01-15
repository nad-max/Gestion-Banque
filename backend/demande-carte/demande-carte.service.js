const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    create,
};

async function getAll(id) {
    return await db.DemandeCarte.findAll({ where: { idUser: id } });
}

async function create(params) {
    // save account
    await db.DemandeCarte.create(params);
}