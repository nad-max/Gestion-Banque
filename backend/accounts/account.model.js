const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rib: { type: DataTypes.STRING, allowNull: false },
        idUser: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        gest: { type: DataTypes.STRING, allowNull: false },
        solde: { type: DataTypes.STRING, allowNull: false }
    };

    

    return sequelize.define('Account', attributes);
}



