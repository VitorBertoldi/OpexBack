'use strict';
export default (sequelize, DataTypes) => {
    const DetalheServico = sequelize.define(
        "DetalheServico",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            subServicoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            detalhe: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            valorBeta: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: 'detalheservico'
        }
    );

    DetalheServico.associate = (models) => {
        DetalheServico.belongsTo(models.SubServico, { foreignKey: "subServicoId", onDelete: "CASCADE" });
    };

    return DetalheServico;
};
