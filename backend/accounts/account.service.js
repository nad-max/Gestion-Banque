const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    create,
    transfer,
    update,
};

async function getAll(id) {
    return await db.Account.findAll({ where: { idUser: id } });
}

async function create(params) {

    // save account
    await db.Account.create(params);
}

async function transfer(params) {
    // validate
     if (! await db.Account.findOne({ where: { rib: params.ribFrom, idUser: params.idUser } })) {
        throw 'RIB source introuvable ';
    }
    if (! await db.Account.findOne({ where: { rib: params.ribTo } })) {
        throw 'RIB destinataire introuvable ';
    }

    // update account
    await update(params);
}

async function update(params) {
    const accountFrom = await getAccount(params.ribFrom);
    const accountTo = await getAccount(params.ribTo);

    if (parseInt(accountFrom.solde,10)<parseInt(params.montant,10)) 
        throw 'Solde insuffisant !';

    let newSolde =  parseInt(accountFrom.solde,10) - parseInt(params.montant,10);
    await db.Account.update({ solde: newSolde }, { where: { id: accountFrom.id } });

    newSolde =  parseInt(accountTo.solde,10) + parseInt(params.montant,10);
    await db.Account.update({ solde: newSolde }, { where: { id: accountTo.id } });

}


// // helper functions

async function getAccount(rib) {
    const account = await db.Account.findOne({ where: { rib: rib } });
    return account;
}

