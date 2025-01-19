'use strict';
export default (sequelize, DataTypes) => {
    const OrcamentoServico = sequelize.define(
        "OrcamentoServico",
        {
            id_orcamentoservico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,  
            },
            id_orcamento: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_categoria: {
                type: DataTypes.INTEGER,
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
        OrcamentoServico.belongsTo(models.Orcamento, { foreignKey: "id_orcamento", onDelete: "CASCADE" });
        OrcamentoServico.belongsTo(models.CategoriaServico, { foreignKey: "id_categoria", onDelete: "CASCADE" }); // Chave estrangeira correta
    };
    
    return OrcamentoServico;
};
