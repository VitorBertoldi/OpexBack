'use strict';
export default (sequelize, DataTypes) => {
    const Client = sequelize.define(
        "clients",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            razaoSocial: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            cnpj: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            nomePontoFocal: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            emailPontoFocal: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            telefonePontoFocal: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {   
            tableName:"clients",
            timestamps: true
        }
    );

    Client.associate = (models) => {
      Client.belongsTo(models.User, { foreignKey: "id_user", onDelete: "SET NULL" });
    }
    return Client;
};
