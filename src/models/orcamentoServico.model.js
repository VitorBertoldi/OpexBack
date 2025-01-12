'use strict';
export default (sequelize, DataTypes) => {
    const OrcamentoServico = sequelize.define(
        "OrcamentoServico",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            orcamentoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoriaServicoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            valorUnitario: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            valorTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

    OrcamentoServico.associate = (models) => {
        OrcamentoServico.belongsTo(models.Orcamento, { foreignKey: "orcamentoId", onDelete: "CASCADE" });
        OrcamentoServico.belongsTo(models.CategoriaServico, { foreignKey: "categoriaServicoId", onDelete: "CASCADE" });
    };

    return OrcamentoServico;
};
