'use strict';
export default (sequelize, DataTypes) => {
    const CategoriaServico = sequelize.define(
        "CategoriaServico",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: 'categoriaservico'
        }
    );

    CategoriaServico.associate = (models) => {
        CategoriaServico.hasMany(models.SubServico, { foreignKey: "categoriaServicoId", onDelete: "CASCADE" });
    };
    // CategoriaServico.associate = (models) => {
    //     CategoriaServico.hasMany(models.OrcamentoServico, { foreignKey: "categoriaServicoId" });
    // };

    return CategoriaServico;
};
