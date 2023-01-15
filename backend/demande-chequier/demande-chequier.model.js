const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        rib: { type: DataTypes.STRING, allowNull: false },
        idUser: { type: DataTypes.STRING, allowNull: false },
        nbCheck: { type: DataTypes.STRING, allowNull: false },
        barre: { type: DataTypes.STRING, allowNull: false },
        etat: { type: DataTypes.STRING, allowNull: false },
    };

    

    return sequelize.define('DemandeChequier', attributes);
}



