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
        DetalheServico.hasMany(models.DetalheServicoValues, { foreignKey: "id", onDelete: "CASCADE" });
    };

    return DetalheServico;
};
