'use strict';
export default (sequelize, DataTypes) => {
    const DetalheServico = sequelize.define(
        "DetalheServico",
        {
            id_detalhes_servico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_subservico: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nm_detalhe: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            type_form: {
                type: DataTypes.STRING(45),
                allowNull: false,
            }
        },
        {
            timestamps: true,
            tableName: 'detalhes_servico'
        }
    );

    DetalheServico.associate = (models) => {
        DetalheServico.belongsTo(models.SubServico, { foreignKey: "id_subservico", onDelete: "CASCADE" });
        DetalheServico.hasMany(models.DetalheServicoValues, { foreignKey: "id_detalhes_servico", onDelete: "CASCADE" });
    };

    return DetalheServico;
};
