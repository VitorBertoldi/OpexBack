export default (sequelize, DataTypes) => {
    const Building = sequelize.define(
        "Building",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            endereco: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            bairro: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            cidade: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            metragem: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            alturaPeDireito: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false
            }
        },
        {
            tableName:"buildings",
            timestamps: true
        }
    );
    Building.associate = (models) => {
      Building.belongsTo(models.Client, { foreignKey: "clientId", onDelete: "CASCADE" });
    }
   
    return Building
};
