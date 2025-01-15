'use strict';
export default (sequelize, DataTypes) => {
    const SubServico = sequelize.define(
        "SubServico",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            categoriaServicoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // custoAdicional: {
            //     type: DataTypes.DECIMAL(10, 2),
            //     allowNull: false,
            // },
        },
        {
            timestamps: true,
            tableName: 'subservico'
        }
    );

    SubServico.associate = (models) => {
        SubServico.hasMany(models.DetalheServico, { foreignKey: "id_subservico", onDelete: "CASCADE" });
        SubServico.belongsTo(models.CategoriaServico, { foreignKey: "categoriaServicoId", onDelete: "CASCADE" });
    };;

    return SubServico;
};
