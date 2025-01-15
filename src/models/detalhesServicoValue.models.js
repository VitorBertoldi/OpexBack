'use strict';
export default (sequelize, DataTypes) => {
    const DetalheServicoValues = sequelize.define(
        "DetalheServicoValues",
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
            tableName: 'detalhes_servico_value'
        }
    );

    DetalheServicoValues.associate = (models) => {
        DetalheServicoValues.belongsTo(models.DetalheServico, { foreignKey: "subServicoId", onDelete: "CASCADE" });
    };

    return DetalheServicoValues;
};
