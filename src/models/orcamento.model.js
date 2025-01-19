'use strict';
export default (sequelize, DataTypes) => {
    const Orcamento = sequelize.define(
        "Orcamento",
        {
            id_orcamento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dataCriacao: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            valorTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "Pendente",
            },
        },
        {
            timestamps: true,
        }
    );

    Orcamento.associate = (models) => {
        Orcamento.belongsTo(models.Client, { foreignKey: "clienteId", onDelete: "CASCADE" });
        Orcamento.hasMany(models.OrcamentoServico, { foreignKey: "orcamentoId" });
    };

    return Orcamento;
};
