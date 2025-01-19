'use strict';

export default (sequelize, DataTypes) => {
    const OrcamentoValues = sequelize.define(
        "OrcamentoValues",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,  
            },
            id_orcamentoservico: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_detalhes_servico: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            value_option: {
                type: DataTypes.INTEGER,  
                allowNull: true,
            },
            value_input: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            timestamps: true,
            tableName: 'orcamento_values',
        }
    );

    OrcamentoValues.associate = (models) => {
        //OrcamentoValues.belongsTo(models.OrcamentoServico, { foreignKey: "id_orcamentoservico", onDelete: "CASCADE" });
        OrcamentoValues.belongsTo(models.DetalheServico, { foreignKey: "id_detalhes_servico", onDelete: "CASCADE" });
    };

    return OrcamentoValues;
};
