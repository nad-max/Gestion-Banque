const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rib: { type: DataTypes.STRING, allowNull: false },
        idUser: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        etat: { type: DataTypes.STRING, allowNull: false },
    };

    

    return sequelize.define('DemandeCarte', attributes);
}



