import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Client from './clients.model.js';

const Building = sequelize.define('Building', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  endereco: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  metragem: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  alturaPeDireito: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

Building.belongsTo(Client, { foreignKey: 'clientId', onDelete: 'CASCADE' });

export default Building;
