const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    create
};

async function getAll(id) {
    return await db.DemandeChequier.findAll({ where: { idUser: id } });
}

async function create(params) {
    // save demande
    await db.DemandeChequier.create(params);
}

// // helper functions

async function getAccount(rib) {
    const account = await db.Account.findOne({ where: { rib: rib } });
    return account;
}

